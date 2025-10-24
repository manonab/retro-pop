"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCategoryCatalog } from "@/queries/useCatalog";
import type { ProductDetailWithSeller } from "@/types/products";
import CategoryHeroVHS from "@/components/categories/CategoryHeroSection";
import ProductCardVHS from "@/components/product/ProductCardVHS";

/* ========= Types locaux (aides) ========= */
type CategoryLite = {
    id: number;
    name: string;
    slug: string;
    banner_url?: string | null;
    gradient?: string | null;
    icon_key?: string | null;
    image_url?: string | null;
};

type ProductImageLite = {
    url: string | null;
    position: number | null;
};

type CatalogData = {
    category: CategoryLite;
    products: ProductDetailWithSeller[];
    total: number;
    pageSize: number;
};

const norm = (s: string) =>
    (s ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

function isCatalogData(x: unknown): x is CatalogData {
    if (!x || typeof x !== "object") return false;
    const o = x as Record<string, unknown>;
    const cat = o.category as Record<string, unknown> | undefined;
    const products = o.products as unknown;
    const total = o.total;
    const pageSize = o.pageSize;

    const catOk =
        !!cat &&
        typeof cat.id === "number" &&
        typeof cat.name === "string" &&
        typeof cat.slug === "string";

    const productsOk = Array.isArray(products);

    const numbersOk =
        typeof total === "number" &&
        Number.isFinite(total) &&
        typeof pageSize === "number" &&
        Number.isFinite(pageSize);

    return catOk && productsOk && numbersOk;
}

/** Récupère la cover d’un produit */
function coverFor(p: ProductDetailWithSeller): string | undefined {
    const imgs =
        (p as unknown as { product_images?: ProductImageLite[] }).product_images ??
        [];
    if (!Array.isArray(imgs) || imgs.length === 0) return undefined;

    const sorted = [...imgs].sort((a, b) => {
        const pa = a?.position ?? 0;
        const pb = b?.position ?? 0;
        return pa - pb;
    });

    const url = sorted[0]?.url ?? undefined;
    return url ?? undefined;
}

export default function CatalogPageClient({ slug }: { slug: string }) {
    const [page, setPage] = useState<number>(1);
    const [q] = useState<string>("");

    const { data, isLoading, error } = useCategoryCatalog(slug);

    const category = isCatalogData(data) ? data.category : null;
    const products = useMemo<ProductDetailWithSeller[]>(
        () => (isCatalogData(data) ? (data.products as ProductDetailWithSeller[]) : []),
        [data]
    );
    const safePageSize = isCatalogData(data) && data.pageSize > 0 ? data.pageSize : 24;

    const filtered = useMemo(() => {
        const needle = norm(q.trim());
        if (!needle) return products;
        return products.filter((p) => {
            const title = norm(String((p)?.title ?? ""));
            const slugN = norm((p)?.slug ?? "");
            return title.includes(needle) || slugN.includes(needle);
        });
    }, [products, q]);

    const pages = Math.max(1, Math.ceil(filtered.length / safePageSize));
    const start = (page - 1) * safePageSize;
    const pageItems = filtered.slice(start, start + safePageSize);
    const hasProducts = pageItems.length > 0;

    if (isLoading) {
        return <div className="container mx-auto px-4 py-10">Chargement…</div>;
    }
    if (error || !category) {
        return <div className="container mx-auto px-4 py-10">Catégorie introuvable</div>;
    }

    return (
        <div className="min-h-screen bg-retro relative">
            <div
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-14 w-[120%] opacity-70"
                style={{ background: "var(--retro-gradient)" }}
                aria-hidden="true"
            />

            <CategoryHeroVHS category={category} total={filtered.length} />

            <div className="container mx-auto px-4 pt-4 pb-2">
                <div className="rounded-2xl border border-border bg-card/80 backdrop-blur p-3 md:p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_8px_22px_rgba(0,0,0,.06)]">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                        <div className="md:ml-auto text-sm text-muted-foreground">
                            {filtered.length} article{filtered.length > 1 ? "s" : ""} • Page {page}/{pages}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-14">
                {!hasProducts ? (
                    <div className="mt-6 rounded-xl border border-dashed border-border bg-card p-8 text-center">
                        <p className="text-muted-foreground">Aucun produit trouvé.</p>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {pageItems.map((product) => (
                            <ProductCardVHS
                                key={(product).id}
                                p={product as ProductDetailWithSeller}
                                cover={coverFor(product as ProductDetailWithSeller)}
                            />
                        ))}
                    </div>
                )}

                {pages > 1 && (
                    <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Pagination">
                        <button
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-border hover:bg-[hsl(var(--background-alt))] disabled:opacity-50 transition-colors"
                            disabled={page <= 1}
                            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                            type="button"
                        >
                            <ChevronLeft className="w-4 h-4" /> Précédent
                        </button>

                        <span className="inline-flex items-center px-3 py-2 rounded-lg bg-white border border-border text-sm">
              {page} / {pages}
            </span>

                        <button
                            className="btn-sticker"
                            disabled={page >= pages}
                            onClick={() => setPage((prev) => Math.min(pages, prev + 1))}
                            type="button"
                        >
                            Suivant <ChevronRight className="ml-1 w-4 h-4" />
                        </button>
                    </nav>
                )}
            </div>

            <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-14 w-[115%] opacity-70"
                style={{ background: "var(--retro-gradient-alt)" }}
                aria-hidden="true"
            />
        </div>
    );
}
