"use client";
import { useState } from "react";
import { useCategoryCatalog } from "@/queries/useCatalog";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_ICON_MAP } from "@/lib/services/catalog";

const CatalogPageClient = ({ slug }: { slug: string }) => {
    const [page, setPage] = useState(1);
    const [q, setQ] = useState("");
    const { data, isLoading, error } = useCategoryCatalog(slug, { page, pageSize: 12, q });

    if (isLoading) return <div className="container mx-auto px-4 py-10">Chargement…</div>;
    if (error || !data?.category) return <div className="container mx-auto px-4 py-10">Catégorie introuvable</div>;

    const { category, products, total, pageSize } = data;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    const Icon = CATEGORY_ICON_MAP[(category.icon_key ?? "tag") as keyof typeof CATEGORY_ICON_MAP] ?? CATEGORY_ICON_MAP.tag;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="relative h-48 md:h-64">
                {category.banner_url && (
                    <Image src={category.banner_url} alt={category.name} fill className="object-cover" priority />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />
                <div className="relative container mx-auto px-4 h-full flex items-end pb-6">
                    <div className="flex items-center gap-3 text-white">
                        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                            <Icon className="w-6 h-6 text-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
                            <p className="text-sm opacity-80">Total : {total}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filtres */}
            <div className="container mx-auto px-4 py-6 flex items-center justify-between gap-3">
                <input
                    className="w-full md:w-80 border rounded-md px-3 h-10 bg-background"
                    placeholder="Rechercher un produit…"
                    value={q}
                    onChange={(e) => {
                        setPage(1);
                        setQ(e.target.value);
                    }}
                />
                <div className="text-sm text-muted-foreground">
                    Page {page}/{pages}
                </div>
            </div>

            {/* Grille */}
            <div className="container mx-auto px-4 pb-10">
                {products.length === 0 ? (
                    <p className="text-muted-foreground">Aucun produit trouvé.</p>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((p: any) => {
                            const cover = p.product_images?.sort?.((a: any, b: any) => a.position - b.position)[0]?.url;
                            return (
                                <Link key={p.id} href={`/product/${p.slug}`} className="group border rounded-xl overflow-hidden hover:shadow-lg transition">
                                    <div className="relative aspect-[4/3] bg-muted">
                                        {cover && <Image src={cover} alt={p.title} fill className="object-cover" sizes="(min-width:1024px) 25vw, 100vw" />}
                                    </div>
                                    <div className="p-4">
                                        <div className="text-xs text-muted-foreground mb-1">{p.categories?.name}</div>
                                        <div className="font-semibold line-clamp-2">{p.title}</div>
                                        <div className="mt-2 text-primary font-bold">{p.price}€</div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}

                {/* Pagination */}
                {pages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                            className="px-3 py-2 border rounded disabled:opacity-50"
                            disabled={page <= 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Précédent
                        </button>
                        <span className="text-sm text-muted-foreground">
              {page} / {pages}
            </span>
                        <button
                            className="px-3 py-2 border rounded disabled:opacity-50"
                            disabled={page >= pages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Suivant
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default CatalogPageClient;