"use client";

import { useRouter, useParams } from "next/navigation";
import { useCategories } from "@/queries/useCatalog";
import { useToast } from "@/components/ui/Toast";
import { ToastType } from "@/components/ui/Toast/types";
import ProductForm, { ProductFormValues } from "@/components/product/ProductForm";
import { useEditProduct } from "@/mutations/products/useEdit";
import { useMyProductBySlug } from "@/queries/useProduct";
import { useUser } from "@/queries/useProfile";

export default function EditProductPage() {
    const { slug } = useParams<{ slug: string }>();
    const { user } = useUser();
    const router = useRouter();

    const { data: categories = [] } = useCategories();
    const { data: product, isLoading } = useMyProductBySlug(user, slug);
    const editProduct = useEditProduct();
    const { openToast } = useToast();

    if (isLoading || !product) {
        return (
            <div className="min-h-screen grid place-items-center bg-retro">
                <div className="rounded-2xl border border-border bg-card/85 backdrop-blur p-6 bevel-card">
                    <p className="text-muted-foreground">Chargement…</p>
                </div>
            </div>
        );
    }

    const initialValues: ProductFormValues = {
        title: product.title,
        description: product.description ?? "",
        price: product.price,
        currency: product.currency,
        category_id: product.category_id,
        rarity: product.rarity,
        condition: product.condition,
        status: product.status,
        images: [], // laisse ProductForm gérer l’upload/remplacement
    };

    return (
        <div className="min-h-screen bg-retro relative">
            <div
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-14 w-[120%] opacity-70"
                style={{ background: "var(--retro-gradient)" }}
            />

            <div className="container mx-auto px-4 py-10 max-w-3xl">
                <header className="text-center mb-8">
                    <h1 className="title-vhs">Éditer l’annonce</h1>
                    <div className="divider-retro mx-auto mt-3" />
                    <p className="mt-2 text-muted-foreground">
                        Mets à jour le titre, les photos, l’état et le prix de ton trésor vintage.
                    </p>
                </header>

                <section className="label-paper vhs-notch rounded-2xl p-6 md:p-8 border border-border bevel-card">
                    <div className="mb-5 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                        <span className="rounded-full border border-[hsl(var(--border))] bg-white px-3 py-1">
              Catégorie actuelle&nbsp;: <strong>{categories.find(c => c.id === product.category_id)?.name ?? "—"}</strong>
            </span>
                        <span className="rounded-full border border-[hsl(var(--border))] bg-white px-3 py-1">
              Statut&nbsp;: <strong>{product.status}</strong>
            </span>
                    </div>

                    <ProductForm
                        mode="edit"
                        categories={categories}
                        initialValues={initialValues}
                        isSubmitting={editProduct.isPending}
                        onSubmit={async (values: ProductFormValues) => {
                            try {
                                await editProduct.mutateAsync({ id: product.id, ...values });
                                openToast({ type: ToastType.SUCCESS, description: "Modifications enregistrées ✅" });
                                router.push("/account");
                            } catch {
                                openToast({ type: ToastType.ERROR, description: "Échec de la mise à jour" });
                            }
                        }}
                    />

                    <div className="mt-6 grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground">
                        <div className="rounded-lg border border-border bg-card p-3">
                            📸 <span className="font-medium">Photos</span> — privilégie 1200px+, lumière neutre
                        </div>
                        <div className="rounded-lg border border-border bg-card p-3">
                            🏷️ <span className="font-medium">État</span> — “Mint / Très bon / Correct” précis
                        </div>
                        <div className="rounded-lg border border-border bg-card p-3">
                            💶 <span className="font-medium">Prix</span> — cohérent avec des ventes récentes
                        </div>
                    </div>
                </section>

                <div className="mt-8 text-center text-xs text-muted-foreground">
                    Les modifications prennent effet dès l’enregistrement.
                </div>
            </div>

            <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-14 w-[115%] opacity-70"
                style={{ background: "var(--retro-gradient-alt)" }}
            />
        </div>
    );
}
