"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryWithProductsBySlug, fetchCategories } from "@/lib/services/catalog";

export function useCategoryCatalog(slug: string) {
    return useQuery({
        queryKey: ["category-catalog", slug],
        queryFn: () => fetchCategoryWithProductsBySlug(slug),
        enabled: !!slug,
    });
}

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 5 * 60 * 1000,
    });
}