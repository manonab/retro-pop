// lib/storage.ts
import { supabase } from "@/lib/supabaseClient";

// map simple depuis le MIME (évite de faire confiance au nom de fichier)
function extFromMime(mime: string): string {
    const m = (mime || "").toLowerCase();
    if (m === "image/jpeg" || m === "image/jpg") return "jpg";
    if (m === "image/png") return "png";
    if (m === "image/webp") return "webp";
    if (m === "image/gif") return "gif";
    return "bin";
}

function safeRandomId() {
    try { return crypto.randomUUID(); } catch { /* Next polyfill */ }
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export async function uploadProductImage(productId: string, file: File) {
    const bucket = "product-images";

    const ext = extFromMime(file.type);
    const key = `${productId}/${safeRandomId()}.${ext}`; // ex: 8c2.../b7f...jpg

    const { error: upErr, data: upData } = await supabase.storage
        .from(bucket)
        .upload(key, file, {
            upsert: false,                         // change en true si tu veux écraser
            cacheControl: "3600",
            contentType: file.type || "application/octet-stream",
        });

    if (upErr) throw upErr;

    const { data: pub } = supabase.storage.from(bucket).getPublicUrl(upData.path);
    const publicUrl = pub.publicUrl;

    const { error: dbErr } = await supabase
        .from("product_images")
        .insert({ product_id: productId, url: publicUrl, position: 1 });

    if (dbErr) {
        await supabase.storage.from(bucket).remove([key]).catch(() => {});
        throw dbErr;
    }

    return publicUrl;
}

export async function deleteProductImage(productId: string, url: string) {
    const bucket = "product-images";
    const idx = url.indexOf(`/object/public/${bucket}/`);
    if (idx === -1) throw new Error("URL de stockage invalide");
    const path = url.slice(idx + (`/object/public/${bucket}/`).length);

    await supabase.storage.from(bucket).remove([path]);
    await supabase
        .from("product_images")
        .delete()
        .eq("product_id", productId)
        .eq("url", url);
}
