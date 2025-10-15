"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useCreateProduct } from "@/mutations/products/useProduct";
import { useCategories } from "@/queries/useCatalog";
import { useToast } from "@/components/ui/Toast";
import { ToastType } from "@/components/ui/Toast/types";
import ProductForm, { ProductFormValues } from "@/components/product/ProductForm";
import {User} from "@/types/user";

export default function NewProductPage() {
    const router = useRouter();
    const createProduct = useCreateProduct();
    const { data: categories = [] } = useCategories();
    const { openToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        (async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.replace("/account");
                return;
            }
            setUser(user);
            setLoading(false);
        })();
    }, [router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-muted-foreground">Chargement…</p>
            </div>
        );
    }

    const initialValues: ProductFormValues = {
        title: "", description: "", price: 0, currency: "EUR",
        category_id: 1, rarity: "EPIC", condition: "Bon", status: "paused", images: [],
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
