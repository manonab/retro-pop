"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { ProductCondition, ProductRarity, ProductStatus } from "@/types/products";

export type NewProductInput = {
    title: string;
    description?: string;
    price: number;
    currency: string;
    condition: ProductCondition;
    category_id: number;
    rarity: ProductRarity;
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

function extFromMime(mime: string): string {
    const m = (mime || "").toLowerCase();
    if (m.includes("jpeg") || m.includes("jpg")) return "jpg";
    if (m.includes("png")) return "png";
    if (m.includes("webp")) return "webp";
    if (m.includes("gif")) return "gif";
    return "bin";
}

// Segments sûrs pour les clés Storage (ASCII, pas de slash, pas d’accents)
function sanitizeSegment(s: string) {
    return (s || "")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^A-Za-z0-9._-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^[-.]+|[-.]+$/g, "") // pas de -/. au bord
        .slice(0, 64);
}

function safeUUID() {
    try {
        return crypto.randomUUID();
    } catch {
        return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
}

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
                    category_id: p.category_id,
                    rarity: p.rarity,
                    status: p.status,
                })
                .select("*")
                .single();
            if (iErr) throw iErr;

            const bucket = "product-images";
            const uploadedKeys: string[] = [];

            try {
                if (p.images?.length) {
                    const rows: { product_id: string; url: string; position: number }[] = [];

                    let pos = 1;
                    for (const file of p.images) {
                        const dir = sanitizeSegment(product.id); // même si c'est un UUID
                        const ext = extFromMime(file.type);
                        const name = sanitizeSegment(`${Date.now()}_${safeUUID()}.${ext}`);
                        if (!dir || !name) throw new Error("Impossible de générer une clé d’upload sûre");

                        const key = `${dir}/${name}`;

                        const { data: upData, error: upErr } = await supabase.storage
                            .from(bucket)
                            .upload(key, file, {
                                upsert: false,
                                contentType: file.type || "application/octet-stream",
                                cacheControl: "3600",
                            });
                        if (upErr) throw upErr;

                        uploadedKeys.push(key);

                        const { data: pub } = supabase.storage.from(bucket).getPublicUrl(upData.path);
                        rows.push({ product_id: product.id, url: pub.publicUrl, position: pos++ });
                    }

                    const { error: imgErr } = await supabase.from("product_images").insert(rows);
                    if (imgErr) throw imgErr;
                }

                return product;
            } catch (err) {
                if (uploadedKeys.length) {
                    await supabase.storage.from(bucket).remove(uploadedKeys).catch(() => {});
                }
                throw err;
            }
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["my-products"] });
            qc.invalidateQueries({ queryKey: ["products"] });
        },
    });
}
