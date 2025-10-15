"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "@/components/ui/Toast";
import { ToastType } from "@/components/ui/Toast/types";
import type { EditProductInput } from "@/types/products";

type UseEditProductOptions = {
    userId?: string;
};

export const qk = {
    productBySlug: (userId: string, slug: string) => ["productBySlug", userId, slug] as const,
    myProducts: (userId: string) => ["my-products", userId] as const,
    products: ["products"] as const,
};

export function useEditProduct(opts: UseEditProductOptions = {}) {
    const qc = useQueryClient();
    const { openToast } = useToast();
    const { userId } = opts;

    return useMutation({
        mutationFn: async (p: EditProductInput) => {
            const { data: { user }, error: uErr } = await supabase.auth.getUser();
            if (uErr) throw uErr;
            if (!user) throw new Error("Vous devez être connecté·e.");

            const { data: current, error: fErr } = await supabase
                .from("products")
                .select("id,seller_id,slug")
                .eq("id", p.id)
                .single();
            if (fErr) throw fErr;
            if (current?.seller_id !== user.id) {
                throw new Error("Non autorisé·e à modifier cette annonce.");
            }

            const update: Record<string, any> = {};
            if (p.title !== undefined) update.title = p.title;
            if (p.description !== undefined) update.description = p.description;
            if (p.price !== undefined) update.price = p.price;
            if (p.currency !== undefined) update.currency = p.currency;
            if (p.condition !== undefined) update.condition = p.condition;
            if (p.category_id !== undefined) update.category_id = p.category_id;
            if (p.rarity !== undefined) update.rarity = p.rarity;
            if (p.status !== undefined) update.status = p.status;

            let updated = current;

            if (Object.keys(update).length > 0) {
                const { data, error } = await supabase
                    .from("products")
                    .update(update)
                    .eq("id", p.id)
                    .select("*")
                    .single();
                if (error) throw error;
                updated = data!;
            }

            if (p.deletedImageIds?.length) {
                const { error } = await supabase
                    .from("product_images")
                    .delete()
                    .in("id", p.deletedImageIds)
                    .eq("product_id", p.id);
                if (error) throw error;
            }

            if (p.newImages?.length) {
                const rows: { product_id: string; url: string; position: number }[] = [];
                for (let i = 0; i < p.newImages.length; i++) {
                    const file = p.newImages[i];
                    const path = `${p.id}/${Date.now()}-${i}-${file.name}`;
                    const { data: up, error: upErr } = await supabase
                        .storage.from("product-images")
                        .upload(path, file, { upsert: false });
                    if (upErr) throw upErr;

                    const { data: { publicUrl } } = supabase
                        .storage.from("product-images")
                        .getPublicUrl(up.path);

                    rows.push({ product_id: p.id, url: publicUrl, position: i });
                }
                const { error: imgErr } = await supabase.from("product_images").insert(rows);
                if (imgErr) throw imgErr;
            }

            return updated;
        },

        onSuccess: (product, variables) => {
            qc.invalidateQueries({ queryKey: ["productBySlug", product.slug] });
            if (userId) qc.invalidateQueries({ queryKey: ["my-products", userId] });

            openToast({
                type: ToastType.SUCCESS,
                description: "Votre annonce a été mise à jour ✅",
            });
        },

        onError: (err) => {
            const msg = err instanceof Error ? err.message : String(err);
            openToast({
                type: ToastType.ERROR,
                description: `Échec de la mise à jour : ${msg}`,
            });
        },
    });
}
