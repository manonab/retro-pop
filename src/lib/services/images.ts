import { supabase } from "@/lib/supabaseClient";

export async function uploadProductImage(productId: string, file: File) {
    const ext = file.name.split(".").pop();
    const path = `${productId}/${crypto.randomUUID()}.${ext}`;

    const up = await supabase.storage.from("product-images").upload(path, file);
    if (up.error) throw up.error;

    const { data } = supabase.storage.from("product-images").getPublicUrl(up.data.path);
    const publicUrl = data.publicUrl;

    const { error: e2 } = await supabase
        .from("product_images")
        .insert({ product_id: productId, url: publicUrl, position: 0 });
    if (e2) throw e2;

    return publicUrl;
}

export async function deleteProductImage(productId: string, url: string) {
    const parts = new URL(url).pathname.split("/public/product-images/");
    const path = parts[1]; // ex: "prodId/uuid.jpg"

    await supabase.storage.from("product-images").remove([path]);
    await supabase.from("product_images").delete().eq("product_id", productId).eq("url", url);
}
