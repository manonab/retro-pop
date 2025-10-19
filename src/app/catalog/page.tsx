"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tag, Sparkles } from "lucide-react";
import { useCategories } from "@/queries/useCatalog";
import { CategoryLite } from "@/types/products";
import { CategoryCardItem } from "@/components/categories/CategoryCard";
import { Button } from "@/components/ui/Button";

/* safer: handle null/undefined */
const norm = (s?: string | null) =>
    (s ?? "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

type SortKey = "popular" | "name" | "newest";
type QuickTag = { label: string; needle: string; path?: string };

const QUICK_TAGS: QuickTag[] = [
    { label: "Jeux vidéo", needle: norm("Jeux vidéo"), path: "/catalog/games" },
    { label: "Cinéma", needle: norm("Cinéma"), path: "/catalog/movies" },
    { label: "Musique", needle: norm("Musique"), path: "/catalog/music" },
    { label: "Livres", needle: norm("Livres"), path: "/catalog/books" },
    { label: "Figurines", needle: norm("Figurines"), path: "/catalog/collectibles" },
];

/* ---- Suspense wrapper (fixes the error) ---- */
export default function CategoriesExplorePage() {
    return (
        <Suspense fallback={<PageSkeleton />}>
            <CategoriesExplorePageInner />
        </Suspense>
    );
}

/* ---- Your original logic lives here ---- */
function CategoriesExplorePageInner() {
    const sp = useSearchParams(); // ✅ now inside Suspense

    const qParam = (sp.get("q") ?? "").trim();
    const tagParamRaw = sp.get("tag");
    const tagParam = tagParamRaw ? norm(tagParamRaw) : null;
    const sortParam = (sp.get("sort") as SortKey | null) ?? null;

    const [q, setQ] = useState(qParam);
    const [activeTag, setActiveTag] = useState<string | null>(tagParam);
    const [sortBy, setSortBy] = useState<SortKey>(sortParam ?? "popular");

    useEffect(() => { setQ(qParam); }, [qParam]);
    useEffect(() => { setActiveTag(tagParam); }, [tagParam]);
    useEffect(() => { if (sortParam) setSortBy(sortParam); }, [sortParam]);

    const { data, isLoading, isError } = useCategories();
    const categories = useMemo<CategoryLite[]>(
        () => (Array.isArray(data) ? data : []),
        [data]
    );

    const filtered = useMemo(() => {
        const needle = norm(q?.trim());
        let list = categories.filter((c) => {
            const nameN = norm(c.name);
            const slugN = norm(c.slug ?? "");
            const matchQ = !needle || nameN.includes(needle) || slugN.includes(needle);
            const matchTag = !activeTag || nameN.includes(activeTag) || slugN.includes(activeTag);
            return matchQ && matchTag;
        });
        if (sortBy === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));
        return list;
    }, [categories, q, activeTag, sortBy]);

    return (
        <div className="min-h-screen bg-retro">
            {/* Hero */}
            <section className="border-b border-[hsl(var(--border))] bg-retro/80 backdrop-blur">
                <div className="container mx-auto px-4 py-8 md:py-10">
                    <div className="flex items-center gap-3 text-[hsl(var(--retro-violet))]">
                        <Sparkles className="w-5 h-5" />
                        <span className="uppercase tracking-wider text-xs font-semibold">Explorer</span>
                    </div>
                    <h1 className="title-vhs text-3xl md:text-4xl mt-2">Catégories Retro Pop</h1>
                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                        <div className="flex items-center justify-between md:justify-end gap-2">
                            <div className="flex flex-wrap gap-2">
                                {QUICK_TAGS.map((t) => {
                                    const selected = activeTag === t.needle;
                                    return (
                                        <Button
                                            key={t.needle}
                                            type="button"
                                            aria-pressed={selected}
                                            className={[
                                                "px-3 py-1.5 rounded-full border text-xs md:text-sm transition",
                                                selected
                                                    ? "border-[hsl(var(--retro-violet))] bg-white"
                                                    : "border-[hsl(var(--border))] bg-white/70 hover:bg-white",
                                            ].join(" ")}
                                            onClick={() => setActiveTag(selected ? null : t.needle)}
                                        >
                                            <Tag className="w-3.5 h-3.5 mr-1 inline-block" />
                                            {t.label}
                                        </Button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 py-8" aria-live="polite">
                {isLoading ? (
                    <SkeletonGrid />
                ) : isError ? (
                    <div className="rounded-xl border p-6">Erreur de chargement. Réessaie plus tard.</div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-xl border p-8 text-center text-muted-foreground">
                        Aucune catégorie ne correspond à ta recherche.
                    </div>
                ) : (
                    <ul className="">
                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filtered.map((categoryItem: CategoryLite) => (
                                    <CategoryCardItem key={categoryItem.id} category={categoryItem} />
                                ))}
                            </div>
                        </div>
                    </ul>
                )}
            </section>
        </div>
    );
}

/* ---- Fallback UI while Suspense resolves ---- */
function PageSkeleton() {
    return (
        <div className="min-h-screen bg-retro">
            <section className="container mx-auto px-4 py-8">
                <div className="h-6 w-40 bg-muted rounded" />
                <div className="mt-4"><SkeletonGrid /></div>
            </section>
        </div>
    );
}

function SkeletonGrid() {
    return (
        <ul className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
                <li key={i} className="rounded-2xl border border-[hsl(var(--border))] bg-card overflow-hidden">
                    <div className="animate-pulse">
                        <div className="aspect-[4/3] bg-muted" />
                        <div className="p-3 space-y-2">
                            <div className="h-4 bg-muted rounded w-2/3" />
                            <div className="h-3 bg-muted rounded w-1/2" />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
