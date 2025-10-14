"use client";

// src/hooks/useCreateProduct.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { z } from "zod";

/**
 * Typages UI alignés avec ta DB actuelle (d’après ton screenshot) :
 * - currency / condition / status / category_id : text → string
 * - rarity : enum → "common" | "rare" | "epic" | "legendary"
 */
export const PRODUCT_CONDITIONS = ["Mint", "Très bon", "Bon", "Correct"] as const;
export const PRODUCT_STATUSES = ["active", "sold", "paused", "deleted"] as const;
export const PRODUCT_RARITIES = ["common", "rare", "epic", "legendary"] as const;

export type ProductCondition = (typeof PRODUCT_CONDITIONS)[number];
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];
export type ProductRarity = (typeof PRODUCT_RARITIES)[number];

export type NewProductInput = {
    title: string;
    description?: string;
    price: number;
    currency: string;
    condition: ProductCondition;
    category_id?: number | null; // text dans ta DB
    rarity?: ProductRarity | null;
    status: ProductStatus;
    images?: File[];
    seller_id?: string;
};

const slugify = (s: string) =>
    s
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

export function useCreateProduct() {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (p: NewProductInput) => {
            const {
                data: { user },
                error: uErr,
            } = await supabase.auth.getUser();
            if (uErr) throw uErr;
            if (!user) throw new Error("Vous devez être connecté·e.");

            const slug = `${slugify(p.title)}-${Math.random().toString(36).slice(2, 7)}`;

            const { data: product, error: iErr } = await supabase
                .from("products")
                .insert({
                    seller_id: user.id,
                    title: p.title,
                    slug,
                    description: p.description ?? null,
                    price: p.price,
                    currency: p.currency,
                    condition: p.condition,
                    category_id: p.category_id ?? null,
                    rarity: p.rarity ?? null,
                    status: p.status,
                })
                .select("*")
                .single();
            if (iErr) throw iErr;

            if (p.images?.length) {
                const rows: { product_id: string; url: string; position: number }[] = [];

                for (let i = 0; i < p.images.length; i++) {
                    const file = p.images[i];
                    const path = `${product.id}/${Date.now()}-${i}-${file.name}`;

                    const { data: up, error: upErr } = await supabase
                        .storage
                        .from("product-images")
                        .upload(path, file, { upsert: false });
                    if (upErr) throw upErr;

                    const {
                        data: { publicUrl },
                    } = supabase.storage.from("product-images").getPublicUrl(up.path);

                    rows.push({ product_id: product.id, url: publicUrl, position: i });
                }

                const { error: imgErr } = await supabase.from("product_images").insert(rows);
                if (imgErr) throw imgErr;
            }

            return product;
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["my-products"] });
            qc.invalidateQueries({ queryKey: ["products"] });
        },
    });
}