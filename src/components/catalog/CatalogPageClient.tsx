"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useCategoryCatalog } from "@/queries/useCatalog";
import type { ProductDetailWithSeller } from "@/types/products";
import CategoryHeroVHS from "@/components/categories/CategoryHeroSection";
import ProductCardVHS from "@/components/product/ProductCardVHS";

export function CatalogPageClient({ slug }: { slug: string }) {
    const [page, setPage] = useState<number>(1);
    const [q, setQ] = useState("");
    const { data, isLoading, error } = useCategoryCatalog(slug);

    if (isLoading) return <div className="container mx-auto px-4 py-10">Chargement…</div>;
    if (error || !data?.category) return <div className="container mx-auto px-4 py-10">Catégorie introuvable</div>;

    const { category, products, total, pageSize } = data as any;
    const pages = Math.max(1, Math.ceil(total / pageSize));

    const coverFor = (p: any) =>
        p?.product_images?.slice?.().sort?.((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0))[0]?.url;

    const hasProducts = products && products.length > 0;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <CategoryHeroVHS category={category} total={total} />

            {/* Filtres */}
            <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center gap-3 md:gap-6">
                <div className="relative w-full md:w-96">
                    <input
                        className="w-full border rounded-xl px-10 h-11 bg-card border-border focus:outline-none focus:ring-2 focus:ring-ring"
                        placeholder="Rechercher un produit…"
                        value={q}
                        onChange={(e) => {
                            setPage(1);
                            setQ(e.target.value);
                        }}
                        aria-label="Rechercher dans la catégorie"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                    Page {page}/{pages}
                </div>
            </div>

            {/* Grille */}
            <div className="container mx-auto px-4 pb-12">
                {!hasProducts ? (
                    <p className="text-muted-foreground">Aucun produit trouvé.</p>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((p: ProductDetailWithSeller) => {
                            const cover = coverFor(p);
                            return <ProductCardVHS key={p.id} p={p} cover={cover} />;
                        })}
                    </div>
                )}

                {/* Pagination */}
                {pages > 1 && (
                    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
                        <button
                            className="inline-flex items-center gap-1 px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-muted transition-colors"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            <ChevronLeft className="w-4 h-4" /> Précédent
                        </button>
                        <span className="text-sm text-muted-foreground">
              {page} / {pages}
            </span>
                        <button
                            className="inline-flex items-center gap-1 px-3 py-2 border rounded-lg disabled:opacity-50 hover:bg-muted transition-colors"
                            disabled={page >= pages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Suivant <ChevronRight className="w-4 h-4" />
                        </button>
                    </nav>
                )}
            </div>
        </div>
    );
}

export default CatalogPageClient;
