"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabaseClient";

export type CartItem = { product_id: string };

type CartState = {
    items: CartItem[];
    add: (product_id: string) => Promise<void>;
    remove: (product_id: string) => Promise<void>;
    clear: () => Promise<void>;
    count: () => number;
    syncToServer: (opts?: { mergeOnSync?: boolean; clearLocalAfterSync?: boolean }) => Promise<void>;
};

function mergeUnique(a: CartItem[], b: CartItem[]): CartItem[] {
    const s = new Set<string>(a.map(x => x.product_id));
    b.forEach(x => s.add(x.product_id));
    return Array.from(s).map(product_id => ({ product_id }));
}

async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user ?? null;
}

async function getOrCreateCartId(userId: string) {
    const { data: existing, error: e1 } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();
    if (e1) throw e1;
    if (existing?.id) return existing.id as string;

    const { data: created, error: e2 } = await supabase
        .from("carts")
        .insert({ user_id: userId })
        .select("id")
        .single();
    if (e2) throw e2;
    return created.id as string;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            // ✅ maintenant async + écrit en BDD si connecté
            add: async (product_id: string) => {
                // Toujours mettre à jour le local (UX immédiate)
                set({ items: mergeUnique(get().items, [{ product_id }]) });

                // Puis, si connecté, upsert côté serveur
                const user = await getUser();
                if (!user) return;
                const cartId = await getOrCreateCartId(user.id);

                const { error } = await supabase
                    .from("cart_items")
                    .upsert(
                        [{ cart_id: cartId, product_id }],
                        { onConflict: "cart_id,product_id", ignoreDuplicates: true }
                    );
                if (error) throw error;
            },

            // ✅ supprime local + serveur si connecté
            remove: async (product_id: string) => {
                set({ items: get().items.filter((it) => it.product_id !== product_id) });

                const user = await getUser();
                if (!user) return;
                const cartId = await getOrCreateCartId(user.id);

                const { error } = await supabase
                    .from("cart_items")
                    .delete()
                    .match({ cart_id: cartId, product_id });
                if (error) throw error;
            },

            // ✅ vide local + cart_items serveur (on garde la ligne carts)
            clear: async () => {
                set({ items: [] });

                const user = await getUser();
                if (!user) return;
                const cartId = await getOrCreateCartId(user.id);

                const { error } = await supabase
                    .from("cart_items")
                    .delete()
                    .eq("cart_id", cartId);
                if (error) throw error;
            },

            count: () => get().items.length,

            // ✅ inchangé, mais propre
            syncToServer: async ({ mergeOnSync = false, clearLocalAfterSync = false } = {}) => {
                const user = await getUser();
                if (!user) return;

                const local = get().items;
                if (!mergeOnSync && local.length === 0) return;

                const cartId = await getOrCreateCartId(user.id);

                let desired: CartItem[] = local;
                if (mergeOnSync) {
                    const { data: serverItems, error: e3 } = await supabase
                        .from("cart_items")
                        .select("product_id")
                        .eq("cart_id", cartId);
                    if (e3) throw e3;
                    desired = mergeUnique((serverItems ?? []) as CartItem[], local);
                }

                if (desired.length) {
                    const rows = desired.map((it) => ({ cart_id: cartId, product_id: it.product_id }));
                    const { error: upErr } = await supabase
                        .from("cart_items")
                        .upsert(rows, { onConflict: "cart_id,product_id", ignoreDuplicates: true });
                    if (upErr) throw upErr;
                }

                if (clearLocalAfterSync) {
                    set({ items: [] });
                }
            },
        }),
        { name: "cart_v1" }
    )
);
