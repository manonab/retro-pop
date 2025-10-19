import { supabase } from "@/lib/supabaseClient";
import {BookOpen, Film, Gamepad, Music, Star} from "lucide-react";

export type CategoryLite = {
    id: number;
    name: string;
    slug: string;
    icon_key: string | null;
    image_url: string | null;
    banner_url: string | null;
    gradient: string | null;
};

export type ProductImageLite = {
    url: string | null;
    position: number | null;
};

export type SellerPublic = {
    user_id: string;
    display_name: string | null;
    avatar_url: string | null;
};

export type ProductWithSeller = {
    id: string;
    title: string;
    slug: string;
    price: number;
    condition: string | null;
    status: string;
    created_at: string | null;
    product_images: ProductImageLite[] | null;
    seller: SellerPublic | null;
};

export type CategoryPageResult = {
    category: CategoryLite;
    products: ProductWithSeller[];
    total: number;
    page: number;
    pageSize: number;
};

export async function fetchCategoryWithProductsBySlug(
    slug: string,
    opts: { page?: number; pageSize?: number; q?: string } = {}
): Promise<CategoryPageResult> {
    const page = opts.page ?? 1;
    const pageSize = opts.pageSize ?? 12;
    const q = (opts.q ?? "").trim();

    const from = Math.max(0, (page - 1) * pageSize);
    const to = from + pageSize - 1;

    const { data: category, error: e1 } = await supabase
        .from("categories")
        .select<"id, name, slug, icon_key, image_url, banner_url, gradient">(
            "id, name, slug, icon_key, image_url, banner_url, gradient"
        )
        .eq("slug", slug)
        .single();
    if (e1) throw e1;

    let base = supabase
        .from("products")
        .select<
            `
      id, title, slug, price, condition, status, created_at,
      product_images ( url, position ),
      seller:profiles!products_seller_id_fkey ( user_id, display_name, avatar_url )
    `
        >(
            `
      id, title, slug, price, condition, status, created_at,
      product_images ( url, position ),
      seller:profiles!products_seller_id_fkey ( user_id, display_name, avatar_url )
    `,
            { count: "exact" }
        )
        .eq("status", "active")
        .eq("category_id", category.id)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (q) {
        base = base.ilike("title", `%${q}%`);
    }

    const { data: items, count, error: e2 } = await base.returns<ProductWithSeller[]>();
    if (e2) throw e2;

    return {
        category: category as CategoryLite,
        products: items ?? [],
        total: count ?? 0,
        page,
        pageSize,
    };
}

export const CATEGORY_ICON_MAP: Record<
    string,
    React.ComponentType<{ className?: string }>
> = {
    gamepad2: Gamepad,
    clapperboard: Film,
    music: Music,
    "book-open": BookOpen,
    tag: Star,
};

export async function fetchCategories(): Promise<CategoryLite[]> {
    const { data, error } = await supabase
        .from("categories")
        .select<"id, name, slug, icon_key, image_url, banner_url, gradient">(
            "id, name, slug, icon_key, image_url, banner_url, gradient"
        )
        .order("name", { ascending: true });

    if (error) throw error;
    return (data ?? []) as CategoryLite[];
}

