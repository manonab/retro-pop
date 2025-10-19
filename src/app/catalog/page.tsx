"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Tag, ChevronDown, Sparkles } from "lucide-react";

import { useCategories } from "@/queries/useCatalog";

type CategoryLite = {
    id: number;
    name: string;
    slug: string;
    image_url?: string | null;
    gradient?: string | null;
    icon_key?: string | null;
    count?: number | null;
};

const QUICK_TAGS = ["Consoles", "VHS", "Vinyles", "Figurines", "Collector"] as const;
type SortKey = "popular" | "name" | "newest";

export default function CategoriesExplorePage() {
    const { data, isLoading, isError } = useCategories(); // doit renvoyer CategoryLite[]
    const categories: CategoryLite[] = Array.isArray(data) ? data : [];

    // UI state
    const [q, setQ] = useState("");
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<SortKey>("popular");

    const totalItems = useMemo(
        () => categories.reduce((acc, c) => acc + (c.count ?? 0), 0),
        [categories]
    );

    const filtered = useMemo(() => {
        const needle = q.trim().toLowerCase();
        let list = categories.filter((c) => {
            const name = c.name.toLowerCase();
            const matchQ = !needle || name.includes(needle);
            const matchTag = !activeTag || name.includes(activeTag.toLowerCase());
            return matchQ && matchTag;
        });

        switch (sortBy) {
            case "name":
                list = [...list].sort((a, b) => a.name.localeCompare(b.name, "fr"));
                break;
            case "newest":
                // si tu as un champ created_at/updated_at -> remplace par ce champ
                list = [...list].sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
                break;
            case "popular":
            default:
                list = [...list].sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
        }
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
                    <p className="text-muted-foreground mt-1">
                        {categories.length} catégorie{categories.length > 1 ? "s" : ""} · {totalItems} objet{totalItems > 1 ? "s" : ""}
                    </p>

                    {/* Outils */}
                    <div className="mt-4 grid gap-3 md:grid-cols-[1fr,auto] md:items-center">
                        {/* Recherche */}
                        <div className="relative">
                            <input
                                className="search-retro h-11 w-full pl-10 pr-28"
                                placeholder="Rechercher une catégorie (ex. ‘VHS’, ‘Vinyles’)…"
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                                aria-label="Rechercher une catégorie"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--border))]" />
                            <button className="bouton-search absolute right-1 top-1/2 -translate-y-1/2 h-9 px-3 rounded-md text-sm"
                                    onClick={() => {/* noop: la recherche est live */}}>
                                Chercher
                            </button>
                        </div>

                        {/* Tri */}
                        <div className="flex items-center justify-between md:justify-end gap-2">
                            <div className="flex flex-wrap gap-2">
                                {QUICK_TAGS.map((t) => (
                                    <button
                                        key={t}
                                        className={[
                                            "px-3 py-1.5 rounded-full border text-xs md:text-sm transition",
                                            activeTag === t
                                                ? "border-[hsl(var(--retro-violet))] bg-white"
                                                : "border-[hsl(var(--border))] bg-white/70 hover:bg-white",
                                        ].join(" ")}
                                        onClick={() => setActiveTag((prev) => (prev === t ? null : t))}
                                    >
                                        <Tag className="w-3.5 h-3.5 mr-1 inline-block" />
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <div className="relative">
                                <button
                                    className="inline-flex items-center gap-2 rounded-md border border-[hsl(var(--border))] bg-white px-3 py-2 text-sm"
                                    onClick={() =>
                                        setSortBy((s) =>
                                            s === "popular" ? "name" : s === "name" ? "newest" : "popular"
                                        )
                                    }
                                    aria-label="Changer l’ordre d’affichage"
                                >
                                    Trier: {sortBy === "popular" ? "Populaire" : sortBy === "name" ? "Nom" : "Récents"}
                                    <ChevronDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grille catégories */}
            <section className="container mx-auto px-4 py-8">
                {isLoading ? (
                    <SkeletonGrid />
                ) : isError ? (
                    <div className="rounded-xl border p-6">Erreur de chargement. Réessaie plus tard.</div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-xl border p-8 text-center text-muted-foreground">
                        Aucune catégorie ne correspond à ta recherche.
                    </div>
                ) : (
                    <ul className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {filtered.map((c) => (
                            <li key={c.id}>
                                <CategoryCard category={c} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

/* ========= Composants ========= */

function CategoryCard({ category }: { category: CategoryLite }) {
    const { slug, name, image_url, gradient, count } = category;
    return (
        <Link
            href={`/catalog/${slug}`}
            className="group block rounded-2xl border border-[hsl(var(--border))] bg-card overflow-hidden
                 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_8px_18px_rgba(0,0,0,.05)]
                 transition hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(0,0,0,.08)]"
        >
            <div className="relative aspect-[4/3]">
                {/* fond gradient si pas d’image */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: image_url
                            ? "transparent"
                            : gradient ?? "linear-gradient(135deg,var(--retro-gradient))",
                    }}
                />
                {image_url && (
                    <Image
                        src={image_url}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                )}

                {/* ruban VHS en overlay subtil */}
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-60 mix-blend-multiply"
                    style={{ background: "var(--retro-gradient-alt)" }}
                />
            </div>

            <div className="p-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium line-clamp-1">{name}</h3>
                    {typeof count === "number" && (
                        <span className="text-xs text-muted-foreground">{count}</span>
                    )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    Découvre les meilleurs objets {name.toLowerCase()} sélectionnés par la communauté.
                </p>
            </div>
        </Link>
    );
}

function SkeletonGrid() {
    return (
        <ul className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
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
