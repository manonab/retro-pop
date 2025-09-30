import { supabase } from "@/lib/supabaseClient";
import {CategoryLite, ProductDetail, ProductDetailWithSeller, ProductImage, SellerLite} from "@/types/products";

export type ProductsOpts = {
    categorySlug?: string;
    page?: number;
    pageSize?: number;
    q?: string;
};

export async function fetchProducts({ categorySlug, page = 1, pageSize = 12, q }: ProductsOpts) {
    const from = (page - 1) * pageSize;
    const to   = from + pageSize - 1;

    let query = supabase
        .from("products")
        .select("*, categories:category_id(slug,name), product_images(url,position)", { count: "exact" })
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .range(from, to);

    if (categorySlug) query = query.eq("categories.slug", categorySlug);
    if (q && q.trim()) query = query.ilike("title", `%${q.trim()}%`);

    const { data, error, count } = await query;
    if (error) throw error;
    return { items: data ?? [], total: count ?? 0, page, pageSize };
}

export async function fetchProductBySlug(slug: string) {
    const { data, error } = await supabase
        .from("products")
        .select("*, categories:category_id(slug,name), product_images(url,position)")
        .eq("slug", slug)
        .single();
    if (error) throw error;
    return data;
}

type RawProductDetail = Omit<ProductDetail, "category" | "product_images"> & {
    category: CategoryLite | CategoryLite[] | null;
    product_images: ProductImage[] | null;
};

export async function fetchProductDetailWithSeller(slug: string): Promise<ProductDetailWithSeller> {
    const { data, error } = await supabase
        .from("products")
        .select(`
      id, seller_id, title, slug, description, price, currency, condition,
      category_id, rarity, status, created_at, updated_at,
      category:categories ( id, name, slug, icon_key, image_url, banner_url, gradient ),
      product_images ( id, product_id, url, position )
    `)
        .eq("slug", slug)
        .eq("status", "active")
        .order("position", { referencedTable: "product_images", ascending: true })
        .single<RawProductDetail>();

    if (error) throw error;
    if (!data) throw new Error("Not found");

    const category = Array.isArray(data.category) ? data.category[0] : data.category;

    const { data: seller, error: sellerErr } = await supabase
        .from("profiles")
        .select("user_id, display_name, avatar_url, is_pro")
        .eq("user_id", data.seller_id)
        .single<SellerLite>();

    if (sellerErr && sellerErr.code !== "PGRST116") throw sellerErr; // ignore not found

    return {
        ...data,
        category: category!,
        product_images: data.product_images ?? [],
        seller: seller ?? null,
    };
}

export async function fetchSimilar(productId: string, categoryId: number) {
    const { data, error } = await supabase
        .from("products")
        .select(`
      id, title, slug, price, currency, condition, rarity, status, created_at, updated_at,
      category:categories ( id, name, slug ),
      product_images ( url, position )
    `)
        .eq("status", "active")
        .eq("category_id", categoryId)
        .neq("id", productId)
        .order("created_at", { ascending: false })
        .limit(8);

    if (error) throw error;
    return data ?? [];
}


