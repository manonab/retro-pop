"use client";

import { useRouter } from "next/navigation";
import { useCategories } from "@/queries/useCatalog";
import { useToast } from "@/components/ui/Toast";
import { ToastType } from "@/components/ui/Toast/types";
import ProductForm, {ProductFormValues} from "@/components/product/ProductForm";
import {useEditProduct} from "@/mutations/products/useEdit";
import { useMyProductBySlug } from "@/queries/useProduct";
import { useParams } from "next/navigation";
import {useUser} from "@/queries/useProfile";

export default function EditProductPage() {
    const { slug } = useParams<{ slug: string }>();
    const { user } = useUser();

    const router = useRouter();
    const { data: categories = [] } = useCategories();
    const { data: product, isLoading } = useMyProductBySlug(user, slug);
    const editProduct = useEditProduct();
    const { openToast } = useToast();

    if (isLoading || !product) return <div className="p-6">Chargement…</div>;
    console.log(product)


    const initialValues: ProductFormValues = {
        title: product.title,
        description: product.description ?? "",
        price: product.price,
        currency: product.currency,
        category_id: product.category_id ?? null,
        rarity: product.rarity ?? null,
        condition: product.condition,
        status: product.status,
        images: [],
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Éditer l’annonce</h1>
            <ProductForm
                mode="edit"
                categories={categories}
                initialValues={initialValues}
                isSubmitting={editProduct.isPending}
                onSubmit={async (values: ProductFormValues) => {
                    try {
                        await editProduct.mutateAsync({ id: product?.id, ...values });
                        openToast({ type: ToastType.SUCCESS, description: "Modifications enregistrées ✅" });
                        router.push("/account");
                    } catch {
                        openToast({ type: ToastType.ERROR, description: "Échec de la mise à jour" });
                    }
                }}
            />
        </div>
    );
}
