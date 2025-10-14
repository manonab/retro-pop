"use client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductBySlug, type ProductsOpts } from "@/lib/services/products";

export function useProducts(opts: ProductsOpts) {
    return useQuery({
        queryKey: ["products", opts],
        queryFn: () => fetchProducts(opts),
    });
}

export function useProduct(slug: string | undefined) {
    return useQuery({
        queryKey: ["product", slug],
        queryFn: () => fetchProductBySlug(slug!),
        enabled: !!slug,
    });
}

export function useInfiniteProducts(opts: Omit<ProductsOpts, "page" | "pageSize"> & { pageSize?: number }) {
    const pageSize = opts.pageSize ?? 12;
    return useInfiniteQuery({
        queryKey: ["products-infinite", { ...opts, pageSize }],
        queryFn: ({ pageParam = 1 }) => fetchProducts({ ...opts, page: pageParam, pageSize }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { page, pageSize, total } = lastPage;
            const maxPage = Math.ceil(total / pageSize);
            return page < maxPage ? page + 1 : undefined;
        },
    });
}

export function useProductDetail(slug: string | undefined) {
    return useQuery({
        queryKey: ["product-detail", slug],
        queryFn: () => fetchProductBySlug(slug!),
        enabled: !!slug,
    });
}
