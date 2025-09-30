import { supabase } from "@/lib/supabaseClient";

export async function fetchCategoryWithProductsBySlug(
    slug: string,
    { page = 1, pageSize = 12, q = "" }: { page?: number; pageSize?: number; q?: string } = {}
) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data: category, error: e1 } = await supabase
        .from("categories")
        .select("id, name, slug, icon_key, image_url, banner_url, gradient")
        .eq("slug", slug)
        .single();
    if (e1) throw e1;

    let qsup = supabase
        .from("products")
        .select("id, title, slug, price, condition, status, created_at, product_images(url,position)", { count: "exact" })
        .eq("status", "active")
        .eq("category_id", category.id)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (q.trim()) qsup = qsup.ilike("title", `%${q.trim()}%`);

    const { data: items, count, error: e2 } = await qsup;
    if (e2) throw e2;

    return { category, products: items ?? [], total: count ?? 0, page, pageSize };
}

export async function fetchCategories() {
    const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });
    if (error) throw error;
    return data ?? [];
}
import { Gamepad, Film, Music, BookOpen, Star } from "lucide-react";

export const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{className?: string}>> = {
    "gamepad2": Gamepad,
    "clapperboard": Film,
    "music": Music,
    "book-open": BookOpen,
    "tag": Star,
};

export const CATEGORY_GRADIENT_BY_SLUG: Record<string, string> = {
    games: "from-amber-400 to-orange-500",
    movies: "from-indigo-400 to-violet-500",
    music: "from-emerald-400 to-teal-500",
    books: "from-rose-400 to-pink-500",
    collectibles: "from-cyan-400 to-blue-500",
};
export const DEFAULT_GRADIENT = "from-primary/30 to-accent/30";