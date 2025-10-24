"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/stores/useCart";
import { Button } from "@/components/ui/Button";

type ProductCard = {
    id: string;
    slug: string;
    title: string;
    price: number | null;
    currency: string | null;
    product_images: { url: string | null; position: number | null }[] | null;
};

async function fetchProductsByIds(ids: string[]): Promise<ProductCard[]> {
    if (!ids.length) return [];
    const { data, error } = await supabase
        .from("products")
        .select(`
      id, slug, title, price, currency,
      product_images ( url, position )
    `)
        .in("id", ids);
    if (error) throw error;
    return (data ?? []) as ProductCard[];
}

export default function CartPage() {
    const items = useCart((s) => s.items);
    const remove = useCart((s) => s.remove);
    const clear = useCart((s) => s.clear);

    const ids = useMemo(
        () => Array.from(new Set(items.map((i) => i.product_id))),
        [items]
    );

    const { data: products = [], isLoading } = useQuery({
        queryKey: ["productsByIds", ids.join(",")],
        queryFn: () => fetchProductsByIds(ids),
        enabled: ids.length > 0,
    });

    const byId = useMemo(() => {
        const m = new Map<string, ProductCard>();
        for (const p of products) m.set(p.id, p);
        return m;
    }, [products]);

    if (items.length === 0) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="text-3xl font-semibold">Mon panier</h1>
                <div className="mt-6 rounded-xl border p-6 text-muted-foreground">
                    Ton panier est vide.
                    <div className="mt-4">
                        <Link href="/"><Button variant="outline">Continuer mes achats</Button></Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-3xl px-4 py-8">
            <h1 className="text-3xl font-semibold">Mon panier</h1>

            {isLoading ? (
                <div className="mt-6 rounded-xl border p-6">Chargement…</div>
            ) : (
                <>
                    <ul className="mt-6 space-y-3">
                        {items.map((it) => {
                            const p = byId.get(it.product_id);
                            const href = p ? `/product/${p.slug}` : "#";
                            const img = p?.product_images?.[0]?.url ?? null;
                            return (
                                <li key={it.product_id} className="flex items-center justify-between gap-3 rounded-xl border p-4">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-muted shrink-0">
                                            {img ? (
                                                <Image src={img} alt={p?.title ?? "Produit"} fill className="object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                                    —
                                                </div>
                                            )}
                                        </div>
                                        <div className="min-w-0">
                                            <Link href={href} className="font-medium hover:underline line-clamp-1">
                                                {p?.title ?? "Produit indisponible"}
                                            </Link>
                                            <div className="text-sm text-muted-foreground">
                                                {p?.slug ?? it.product_id}
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        className="text-red-600 shrink-0"
                                        onClick={() => remove(it.product_id)}
                                    >
                                        Retirer
                                    </Button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="mt-6 flex gap-3">
                        <Button variant="outline" onClick={() => clear()}>Vider le panier</Button>
                        <Link href="/checkout"><Button>Passer au paiement</Button></Link>
                    </div>
                </>
            )}
        </div>
    );
}
