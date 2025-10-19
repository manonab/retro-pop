// app/search/page.tsx
"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SearchBox from "@/components/catalog/search/SearchBox";
import ProductCardVHS from "@/components/product/ProductCardVHS";
import { ProductDetailWithSeller } from "@/types/products";
import {useSearchProducts} from "@/queries/useSeachProduct";

export default function Page() {
    const sp = useSearchParams();
    const q = (sp.get("q") ?? "").trim();

    const page = useMemo(() => {
        const n = Number(sp.get("page") ?? 1);
        return Number.isFinite(n) && n > 0 ? n : 1;
    }, [sp]);

    const PAGE_SIZE = 24;

    const { data, isLoading, isError, error } = useSearchProducts({
        q,
        page,
        pageSize: PAGE_SIZE,
    });

    const products = data?.items ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">
                {q ? `Résultats pour “${q}”` : "Explorer le catalogue"}
            </h1>

            <SearchBox initialQuery={q} />

            {isLoading ? (
                <p className="mt-6 text-muted-foreground">Chargement…</p>
            ) : isError ? (
                <p className="mt-6 text-red-600">Erreur : {(error as Error)?.message}</p>
            ) : products.length === 0 ? (
                <p className="mt-6 text-muted-foreground">
                    {q ? "Aucun résultat." : "Rien à afficher pour le moment."}
                </p>
            ) : (
                <>
                    <ul className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {products.map((p: ProductDetailWithSeller) => (
                            <ProductCardVHS key={p.id} p={p} />
                        ))}
                    </ul>

                    {totalPages > 1 && (
                        <nav className="mt-8 flex items-center justify-center gap-2">
                            <PageLink q={q} page={page - 1} disabled={page <= 1}>
                                Précédent
                            </PageLink>
                            <span className="text-sm">
                Page {page} / {totalPages}
              </span>
                            <PageLink q={q} page={page + 1} disabled={page >= totalPages}>
                                Suivant
                            </PageLink>
                        </nav>
                    )}
                </>
            )}
        </main>
    );
}

function PageLink({
                      q,
                      page,
                      disabled,
                      children,
                  }: {
    q: string;
    page: number;
    disabled?: boolean;
    children: React.ReactNode;
}) {
    const href =
        page > 1
            ? `/search?q=${encodeURIComponent(q)}&page=${page}`
            : `/search?q=${encodeURIComponent(q)}`;
    return disabled ? (
        <span className="px-3 py-2 text-sm text-muted-foreground border rounded-md opacity-60">
      {children}
    </span>
    ) : (
        <Link className="px-3 py-2 text-sm border rounded-md hover:bg-secondary" href={href}>
            {children}
        </Link>
    );
}
