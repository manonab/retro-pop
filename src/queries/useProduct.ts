import {useQuery} from "@tanstack/react-query";
import {ProductBase} from "@/types/products";
import {supabase} from "@/lib/supabaseClient";
import { User } from "@/types/user";

export function useMyProductBySlug(user?: User, slug?: string) {
    return useQuery({
        queryKey: ["productBySlug", slug],
        enabled: !!user?.id && !!slug,
        queryFn: async (): Promise<ProductBase | null> => {
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
                .eq("seller_id", user?.id!)
                .eq("slug", slug!)
                .maybeSingle();
            if (error) throw error;
            return data as unknown as ProductBase | null;
        },
    });
}

