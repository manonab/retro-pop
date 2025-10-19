// src/queries/useSearchProducts.ts
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { ProductDetailWithSeller } from "@/types/products";

type SearchArgs = {
    q?: string;
    page?: number;
    pageSize?: number;
};

type SearchResult = {
    items: ProductDetailWithSeller[];
    total: number;
    page: number;
    pageSize: number;
};

export function useSearchProducts({ q = "", page = 1, pageSize = 24 }: SearchArgs) {
    return useQuery<SearchResult>({
        queryKey: ["searchProducts", { q, page, pageSize }],
        queryFn: async () => {
            const from = (page - 1) * pageSize;
            const to = from + pageSize - 1;

            let query = supabase
                .from("products")
                .select(`
          id,
          seller_id,
          title,
          slug,
          description,
          price,
          currency,
          condition,
          category_id,
          status,
          rarity,
          created_at,
          updated_at,
          product_images ( id, url, position )
        `, { count: "exact" })
                .order("created_at", { ascending: false })
                .range(from, to);

            const term = q.trim();
            if (term) {
                query = query.or(
                    `title.ilike.%${term}%,description.ilike.%${term}%,slug.ilike.%${term}%`
                );
            }

            const { data, error, count } = await query;
            if (error) throw error;

            return {
                items: (data ?? []) as ProductDetailWithSeller[],
                total: count ?? 0,
                page,
                pageSize,
            };
        },
        enabled: page > 0 && pageSize > 0,
        staleTime: 30_000,
    });
}
