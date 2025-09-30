"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchCategoryWithProductsBySlug, fetchCategories } from "@/lib/services/catalog";

export function useCategoryCatalog(slug: string, opts?: { page?: number; pageSize?: number; q?: string }) {
    return useQuery({
        queryKey: ["category-catalog", slug, opts],
        queryFn: () => fetchCategoryWithProductsBySlug(slug, opts),
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