export type ProductCondition = "Mint" | "Très bon" | "Bon" | "Correct";
export type ProductStatus    = "active" | "sold" | "paused" | "deleted";
export type ProductRarity    = "rare" | "epic" | "legendary";

export type CategoryLite = {
    id: string;
    name: string;
    slug: string;
    icon_key: string;
    image_url: string;
    banner_url: string;
    gradient: string;
};

export type SellerLite = {
    user_id: string;
    display_name: string | null;
    avatar_url: string | null;
    is_pro: boolean;
};

export type ProductImage = {
    id: string;
    product_id: string;
    url: string;
    position: number;
};

export type Profiles = {
    user_id: string;
    display_name: string;
    avatar_url: string;
    is_pro: boolean;
    created_at: string;
}

export type ProductBase = {
    id: string;
    seller_id: string;
    title: string;
    slug: string;
    description?: string | null;
    price: number;
    currency: string;
    condition: ProductCondition;
    category_id: number;
    rarity: string;
    status: ProductStatus;
    created_at: string;
    updated_at: string;
};

export type ProductCardItem = ProductBase;

export type ProductDetail = ProductBase & {
    category: CategoryLite;
    product_images: ProductImage[];
};

export type ProductDetailWithSeller = ProductDetail & { seller: SellerLite | null };
