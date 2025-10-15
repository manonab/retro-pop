import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import {ProductDetailWithSeller} from "@/types/products";
import {fetchProductDetailWithSeller} from "@/lib/services/products";


export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params; // 👈 important
    const productData: ProductDetailWithSeller =
        await fetchProductDetailWithSeller(slug);

    if (!productData) return notFound();

    return <ProductDetail product={productData} />;
}
