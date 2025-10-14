"use client";

import { useRouter } from "next/navigation";
import { useCreateProduct } from "@/mutations/products/useProduct";
import { useCategories } from "@/queries/useCatalog";
import { useToast } from "@/components/ui/Toast";
import { ToastType } from "@/components/ui/Toast/types";
import ProductForm, { ProductFormValues } from "@/components/product/ProductForm";

export default function NewProductPage() {
    const router = useRouter();
    const createProduct = useCreateProduct();
    const { data: categories = [] } = useCategories();
    const { openToast } = useToast();

    const initialValues: ProductFormValues = {
        title: "", description: "", price: 0, currency: "EUR",
        category_id: null, rarity: null, condition: "Bon", status: "paused", images: [],
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">Créer une annonce</h1>
            <ProductForm
                mode="create"
                categories={categories}
                initialValues={initialValues}
                isSubmitting={createProduct.isPending}
                onSubmit={async (values: ProductFormValues) => {
                    try {
                        await createProduct.mutateAsync(values);
                        openToast({ type: ToastType.SUCCESS, description: "Annonce créée ✅" });
                        router.push("/account");
                    } catch (err) {
                        openToast({ type: ToastType.ERROR, description: "Échec de la création" });
                    }
                }}
            />
        </div>
    );
}
