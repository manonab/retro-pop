"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/stores/useCart";
import { Button } from "@/components/ui/Button";
import {CartItems} from "@/types/products";

type ProductRow = {
    id: string;
    slug: string;
    title: string;
    price: number | null;
    currency: string | null;
    status?: string | null;
    product_images: { url: string | null; position: number | null }[] | null;
};

async function requireUserOrRedirect(router: ReturnType<typeof useRouter>) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        router.replace("/login?redirect=/checkout");
        throw new Error("NO_AUTH");
    }
    return user;
}

async function getOrCreateCartId(userId: string): Promise<string> {
    const { data: existing, error: e1 } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", userId)
        .maybeSingle();
    if (e1) throw e1;
    if (existing?.id) return existing.id as string;

    const { data: created, error: e2 } = await supabase
        .from("carts")
        .insert({ user_id: userId })
        .select("id")
        .single();
    if (e2) throw e2;
    return created.id as string;
}

async function fetchServerCartProductIds(cartId: string): Promise<(string | undefined)[]> {
    const { data, error } = await supabase
        .from("cart_items")
        .select("product_id")
        .eq("cart_id", cartId);
    if (error) throw error;
    return (data ?? []).map((r: Partial<CartItems>) => r.product_id);
}

async function fetchProductsByIds(ids: string[]): Promise<ProductRow[]> {
    if (!ids.length) return [];
    const { data, error } = await supabase
        .from("products")
        .select(`
      id, slug, title, price, currency, status,
      product_images ( url, position )
    `)
        .in("id", ids);
    if (error) throw error;
    return (data ?? []) as unknown as ProductRow[];
}

function formatMoney(amount: number, currency: string | null | undefined) {
    const cur = currency ?? "EUR";
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency: cur }).format(amount);
}

export default function CheckoutPage() {
    const router = useRouter();
    const syncToServer = useCart((s) => s.syncToServer);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    router.replace("/login?redirect=/checkout");
                    return;
                }
                setUserId(user.id);
                // mergeOnSync: true → fusionne serveur + local
                await syncToServer({ mergeOnSync: true, clearLocalAfterSync: false });
            } catch {
            }
        })();
    }, [router, syncToServer]);

    const cartIdQuery = useQuery({
        queryKey: ["cartId", userId],
        enabled: !!userId,
        queryFn: async () => {
            const u = await requireUserOrRedirect(router);
            return getOrCreateCartId(u.id);
        },
        staleTime: 60_000,
    });

    const productIdsQuery = useQuery({
        queryKey: ["cartProductIds", cartIdQuery.data],
        enabled: !!cartIdQuery.data,
        queryFn: () => fetchServerCartProductIds(cartIdQuery.data as string),
    });

    const productsQuery = useQuery({
        queryKey: ["cartProducts", (productIdsQuery.data ?? []).join(",")],
        enabled: !!productIdsQuery.data && (productIdsQuery.data as string[]).length > 0,
        queryFn: () => fetchProductsByIds(productIdsQuery.data as string[]),
    });

    const isLoading =
        cartIdQuery.isLoading || productIdsQuery.isLoading || productsQuery.isLoading;

    const products: ProductRow[] = useMemo(
        () => productsQuery.data ?? [],
        [productsQuery.data]
    );

    const currency = useMemo(
        () => products[0]?.currency ?? "EUR",
        [products]
    );

    const unavailable = useMemo(
        () => products.filter((p) => p.status && p.status !== "available"),
        [products]
    );

    const subtotal = useMemo(
        () => products.reduce((sum, p) => sum + (p.price ?? 0), 0),
        [products]
    );

    const canPay = useMemo(
        () => products.length > 0 && unavailable.length === 0,
        [products.length, unavailable.length]
    );

    async function handleConfirm() {
        router.push("/payment");
    }

    return (
        <div className="mx-auto max-w-4xl px-4 py-8">
            <h1 className="text-3xl font-semibold">Paiement</h1>

            {isLoading && (
                <div className="mt-6 rounded-xl border p-6">Chargement de votre panier…</div>
            )}

            {!isLoading && products.length === 0 && (
                <div className="mt-6 rounded-xl border p-6 text-muted-foreground">
                    Votre panier est vide.
                    <div className="mt-4">
                        <Link href="/"><Button variant="outline">Continuer mes achats</Button></Link>
                    </div>
                </div>
            )}

            {!isLoading && products.length > 0 && (
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-3">
                        {products.map((p) => {
                            const img = p.product_images?.[0]?.url ?? null;
                            const notAvailable = p.status && p.status !== "available";
                            return (
                                <div key={p.id} className="flex items-center gap-3 rounded-xl border p-3">
                                    <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted shrink-0">
                                        {img ? (
                                            <Image src={img} alt={p.title} fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">—</div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <Link href={`/product/${p.slug}`} className="font-medium hover:underline line-clamp-1">
                                            {p.title}
                                        </Link>
                                        <div className="text-sm text-muted-foreground">
                                            {p.slug}
                                            {notAvailable && (
                                                <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs text-red-700">
                          Indisponible
                        </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="font-medium">
                                        {formatMoney(p.price ?? 0, p.currency)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <aside className="h-fit rounded-2xl border p-6">
                        <h2 className="text-xl font-semibold">Récapitulatif</h2>

                        <div className="mt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Sous-total</span>
                                <span className="font-medium">{formatMoney(subtotal, currency)}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Frais & TVA</span>
                                <span>Calculés à l’étape paiement</span>
                            </div>
                        </div>

                        {unavailable.length > 0 && (
                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                Certains articles ne sont plus disponibles. Retirez-les avant de payer.
                            </div>
                        )}

                        <Button
                            className="mt-6 w-full"
                            disabled={!canPay}
                            onClick={handleConfirm}
                        >
                            Confirmer et payer
                        </Button>

                        <p className="mt-3 text-xs text-muted-foreground">
                            Le paiement confirmera définitivement la réservation des articles.
                        </p>
                    </aside>
                </div>
            )}
        </div>
    );
}
