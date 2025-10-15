export const PRODUCT_CONDITIONS = ["Mint", "Très bon", "Bon", "Correct"] as const;
export const PRODUCT_STATUSES   = ["active", "sold", "paused", "deleted"] as const;
export const PRODUCT_RARITIES   = ["COMMON", "RARE", "EPIC", "LEGENDARY"] as const;

export type ProductCondition = typeof PRODUCT_CONDITIONS[number];
export type ProductStatus    = typeof PRODUCT_STATUSES[number];
export type ProductRarity    = typeof PRODUCT_RARITIES[number];

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
};

export type ProductBase = {
    id: string;
    seller_id: string;
    title: string;
    slug: string | null;
    description?: string | null;
    price: number;
    currency: string;
    condition: ProductCondition;
    category_id: number;
    rarity: ProductRarity;
    status: ProductStatus;
    created_at: string;
    updated_at: string;
    product_images: { id: string; url: string; position: number }[];
};

export type ProductDetail = ProductBase & {
    category: CategoryLite;
    product_images: ProductImage[];
};

export type ProductDetailWithSeller = ProductDetail & { seller: SellerLite | null };

export type NewProductInput = {
    seller_id: string;
    title: string;
    slug: string | null;
    description?: string | null;
    price: number;
    currency: string;
    condition: ProductCondition;
    category_id: number | null;
    rarity: ProductRarity;
    status: ProductStatus;
};

export type EditProductInput = {
    id: string;
    title?: string;
    description?: string | null;
    price?: number;
    currency?: string;
    condition?: ProductCondition;
    category_id?: number | null;
    rarity?: ProductRarity;
    status?: ProductStatus;
    newImages?: File[];
    deletedImageIds?: string[];
};
