"use client";

import { useCategories } from "@/queries/useCatalog";
import {
    CATEGORY_GRADIENT_BY_SLUG,
    CATEGORY_ICON_MAP,
    DEFAULT_GRADIENT,
} from "@/lib/services/catalog";
import Link from "next/link";
import Image from "next/image";

export function CategoryGrid() {
    const { data, isLoading, error } = useCategories();

    if (isLoading) {
        return (
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="title-vhs">Explorez nos univers vintage</h2>
                        <div className="divider-retro mx-auto mt-3" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-72 rounded-2xl border border-border bg-card animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-16">
                <div className="container mx-auto px-4 text-center text-muted-foreground">
                    Impossible de charger les catégories pour le moment.
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="title-vhs">Explorez nos univers vintage</h2>
                    <div className="divider-retro mx-auto mt-3" />
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Chaque catégorie recèle des trésors uniques. Plongez dans l&apos;univers qui vous passionne et découvrez des pépites rares.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.map((category: any) => {
                        const iconKey = (category.icon_key ?? "tag") as keyof typeof CATEGORY_ICON_MAP;
                        const Icon = CATEGORY_ICON_MAP[iconKey] ?? CATEGORY_ICON_MAP.tag;
                        const gradient = CATEGORY_GRADIENT_BY_SLUG[category.slug] ?? DEFAULT_GRADIENT;

                        return (
                            <Link key={category.id} href={`/catalog/${category.slug}`} className="group block">
                                <article
                                    className="
                    relative overflow-hidden rounded-2xl border border-border bg-card
                    transition-all duration-300
                    hover:-translate-y-1 hover:scale-[1.02]
                    hover:shadow-[0_0_28px_hsl(271_80%_55%/.25)]
                  "
                                >
                                    <div className="relative h-48 px-4 pt-4 pb-1">
                                        <div className="relative h-48 overflow-hidden rounded-2xl isolate">
                                            {category.image_url ? (
                                                <Image
                                                    src={category.image_url}
                                                    alt={category.name}
                                                    fill
                                                    sizes="(min-width:1024px) 33vw, 100vw"
                                                    className="object-cover z-0"
                                                    priority={false}
                                                />
                                            ) : (
                                                <div
                                                    className="absolute inset-0 z-0 bg-gradient-to-br from-[hsl(var(--retro-blue)/.15)] to-[hsl(var(--retro-violet)/.15)]"/>
                                            )}
                                            <div
                                                className="absolute inset-0 z-10 bg-[hsl(var(--background)/.25)] mix-blend-multiply"/>
                                            <div className="absolute inset-0 scanlines opacity-25"/>
                                            <div className="absolute inset-0 tape-noise opacity-30"/>
                                            <div
                                                className="absolute inset-0 z-20 bg-gradient-to-t from-[hsl(var(--retro-violet)/.5)] via-transparent to-transparent"/>
                                        </div>

                                        {/* Sticker icône en haut-droit */}
                                        <div className="absolute top-4 right-4">
                                            <div className="sticker sticker-paper rounded-xl px-2.5 py-2 shadow-[var(--shadow-retro)]">
                                                <Icon className="w-5 h-5 text-foreground" />
                                            </div>
                                        </div>

                                        {/* Compteur */}
                                        {typeof category.count === "number" && (
                                            <div className="absolute bottom-3 left-6">
                        <span className="bg-black/55 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {category.count}
                        </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Étiquette papier (label) */}
                                    <div className="p-6">
                                        <div className="label-paper rounded-xl p-4">
                                            <h3
                                                className="
                          text-xl font-bold mb-1 transition-colors
                          chromatic group-hover:text-[hsl(var(--retro-violet))]
                        "
                                            >
                                                {category.name}
                                            </h3>
                                            {category.description && (
                                                <p className="text-muted-foreground line-clamp-2">{category.description}</p>
                                            )}
                                        </div>

                                        {/* Bouton léger façon lien */}
                                        <div className="mt-4">
                      <span
                          className="
                          inline-flex items-center gap-1 text-[hsl(var(--retro-rose))]
                          font-semibold underline underline-offset-4 decoration-2
                          hover:opacity-85 transition-opacity
                        "
                      >
                        Voir la catégorie →
                      </span>
                                        </div>
                                    </div>

                                    {/* Liseré VHS bas (ruban dégradé discret) */}
                                    <div
                                        aria-hidden
                                        className="absolute bottom-0 left-0 right-0 h-1.5 opacity-80"
                                        style={{ background: "var(--retro-gradient)" }}
                                    />
                                </article>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
