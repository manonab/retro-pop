"use client";

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import {ProductBase} from "@/types/products";

export function useMyProducts(userId?: string) {
    return useQuery({
        queryKey: ["my-products", userId],
        enabled: !!userId,
        queryFn: async (): Promise<ProductBase[]> => {
            const { data, error } = await supabase
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
                `)
                .eq("seller_id", userId!)
                .order("created_at", { ascending: false });

            if (error) throw error;
            return (data ?? []) as unknown as ProductBase[];
        },
    });
}
