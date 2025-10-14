import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import {fetchProductDetailWithSeller} from "@/lib/services/products";
import {ProductDetailWithSeller} from "@/types/products";

export default async function Page({ params }: { params: { slug: string } }) {
    const productData: ProductDetailWithSeller = await fetchProductDetailWithSeller(params.slug);
    if (!productData) return notFound();

    return <ProductDetail product={productData} />;
}
