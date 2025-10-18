"use client";
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
        <div className="min-h-screen bg-retro relative">
            {/* ruban VHS décoratif en haut */}
            <div className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-14 w-[120%] opacity-70"
                 style={{ background: "var(--retro-gradient)" }} />

            {/* Hero catégorie (déjà stylé VHS) */}
            <CategoryHeroVHS category={category} total={total} />

            {/* Barre filtres/recherche */}
            <div className="container mx-auto px-4 pt-4 pb-2">
                <div className="
          rounded-2xl border border-border bg-card/80 backdrop-blur p-3 md:p-4
          shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_8px_22px_rgba(0,0,0,.06)]
        ">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                        {/* Search input VHS */}
                        <div className="relative w-full md:w-[460px]">
                            <input
                                className="search-retro h-11 pl-10 pr-28 w-full"
                                placeholder="Rechercher un produit…"
                                value={q}
                                onChange={(e) => {
                                    setPage(1);
                                    setQ(e.target.value);
                                }}
                                aria-label="Rechercher dans la catégorie"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--border))] w-4 h-4" />
                            <button
                                className="bouton-search absolute right-1 top-1/2 -translate-y-1/2 rounded-md px-3 py-2 text-sm"
                            >
                                Chercher
                            </button>
                        </div>

                        {/* Quick chips (exemples — adapte selon tes filtres) */}
                        <div className="flex flex-wrap gap-2">
                            {["Neuf", "Très bon état", "Collector"].map(tag => (
                                <button
                                    key={tag}
                                    className="px-3 py-1.5 text-xs md:text-sm rounded-full border border-[hsl(var(--border))]
                           bg-white hover:border-[hsl(var(--retro-violet))] transition"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Compteurs & page à droite */}
                        <div className="md:ml-auto text-sm text-muted-foreground">
                            {total} article{total > 1 ? "s" : ""} • Page {page}/{pages}
                        </div>
                    </div>
                </div>
            </div>

            {/* Grille produits */}
            <div className="container mx-auto px-4 pb-14">
                {!hasProducts ? (
                    <div className="mt-6 rounded-xl border border-dashed border-border bg-card p-8 text-center">
                        <p className="text-muted-foreground">Aucun produit trouvé.</p>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((p: ProductDetailWithSeller) => {
                            const cover = coverFor(p);
                            return <ProductCardVHS key={p.id} p={p} cover={cover} />;
                        })}
                    </div>
                )}

                {/* Pagination VHS */}
                {pages > 1 && (
                    <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
                        <button
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-[hsl(var(--background-alt))] disabled:opacity-50 transition-colors"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            <ChevronLeft className="w-4 h-4" /> Précédent
                        </button>

                        <span className="inline-flex items-center px-3 py-2 rounded-lg bg-white border border-border text-sm">
              {page} / {pages}
            </span>

                        <button
                            className="btn-sticker"
                            disabled={page >= pages}
                            onClick={() => setPage((p) => Math.min(pages, p + 1))}
                        >
                            Suivant <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </nav>
                )}
            </div>

            {/* ruban VHS décoratif en bas */}
            <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-14 w-[115%] opacity-70"
                 style={{ background: "var(--retro-gradient-alt)" }} />
        </div>
    );
}

export default CatalogPageClient;
