"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useCreateProduct } from "@/mutations/products/useProduct";
import { useCategories } from "@/queries/useCatalog";
import { useToast } from "@/components/ui/Toast";
import { ToastType } from "@/components/ui/Toast/types";
import ProductForm, { ProductFormValues } from "@/components/product/ProductForm";
import type { User } from "@/types/user";

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
            setUser(user as unknown as User);
            setLoading(false);
        })();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen grid place-items-center bg-retro">
                <div className="rounded-2xl border border-border bg-card/85 backdrop-blur p-6 bevel-card">
                    <p className="text-muted-foreground">Chargement…</p>
                </div>
            </div>
        );
    }

    const initialValues: ProductFormValues = {
        title: "",
        description: "",
        price: 0,
        currency: "EUR",
        category_id: categories?.[0]?.id ?? 1,
        rarity: "EPIC",
        condition: "Bon",
        status: "paused",
        images: [],
    };

    return (
        <div className="min-h-screen bg-retro relative">
            {/* ruban VHS décoratif */}
            <div
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-14 w-[120%] opacity-70"
                style={{ background: "var(--retro-gradient)" }}
            />

            <div className="container mx-auto px-4 py-10 max-w-3xl">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="title-vhs">
                        Créer une annonce
                    </h1>
                    <div className="divider-retro mx-auto mt-3" />
                    <p className="mt-3 text-muted-foreground">
                        Ajoute ton trésor vintage : titre, photos, état, prix — et c’est parti ✨
                    </p>
                </header>

                {/* Card formulaire */}
                <section className="label-paper vhs-notch rounded-2xl p-6 md:p-8 border border-border bevel-card">
                    {/* Mini info bar */}
                    <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full border border-[hsl(var(--border))] bg-white px-3 py-1">
              Connecté·e : <strong>{user?.email ?? "—"}</strong>
            </span>
                        <span className="rounded-full border border-[hsl(var(--border))] bg-white px-3 py-1">
              Brouillon sauvegardé à la validation
            </span>
                    </div>

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

                    {/* Tips discrets */}
                    <div className="mt-6 grid gap-3 sm:grid-cols-3 text-xs text-muted-foreground">
                        <div className="rounded-lg border border-border bg-card p-3">
                            📸 <span className="font-medium">Photos</span> — 3 minimum, 1200px+ conseillé
                        </div>
                        <div className="rounded-lg border border-border bg-card p-3">
                            🏷️ <span className="font-medium">État</span> — sois précis·e (mint, très bon, correct…)
                        </div>
                        <div className="rounded-lg border border-border bg-card p-3">
                            💶 <span className="font-medium">Prix</span> — reste cohérent avec le marché
                        </div>
                    </div>
                </section>

                {/* Footer action */}
                <footer className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground">
                        En publiant, tu acceptes nos conditions et règles de la communauté.
                    </p>
                </footer>
            </div>

            {/* ruban VHS décoratif bas */}
            <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-14 w-[115%] opacity-70"
                style={{ background: "var(--retro-gradient-alt)" }}
            />
        </div>
    );
}
