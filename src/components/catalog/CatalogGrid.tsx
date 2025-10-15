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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-72 rounded-2xl border border-border bg-card animate-pulse"
                            />
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
                    <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 shadow-type">
                        Explorez nos univers vintage
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                                <article className="relative overflow-hidden rounded-2xl bg-card border border-border bevel-card transition-all duration-300 hover:shadow-[0_0_24px_hsl(268_48%_46%/.35)] hover:scale-[1.03] hover:-translate-y-1">
                                    {/* Fenêtre “cassette” */}
                                    <div className="relative h-48 overflow-hidden px-4 pt-4">
                                        <div
                                            className="absolute inset-0 rounded-2xl tape-window vhs-notch overflow-hidden">
                                            {category.image_url ? (
                                                <Image
                                                    src={category.image_url}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(min-width:1024px) 33vw, 100vw"
                                                    priority={false}
                                                />
                                            ) : (
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-br from-primary/15 to-accent/15"/>
                                            )}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`}/>
                                            <div className="absolute inset-0 scanlines opacity-30"/>
                                            <div className="absolute inset-0 tape-noise opacity-40"/>
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <div className="relative sticker sticker-paper px-2.5 py-2 rounded-xl">
                                                <Icon className="w-5 h-5 text-foreground"/>
                                            </div>
                                        </div>
                                        {/* Count pill */}
                                        {typeof category.count === "number" && (
                                            <div className="absolute bottom-4 left-6">
                        <span
                            className="bg-black/55 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                          {category.count}
                        </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Étiquette papier (label) */}
                                    <div className="p-6">
                                        <div className="label-paper rounded-xl p-4">
                                            <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors chromatic">
                                                {category.name}
                                            </h3>
                                            {category.description && (
                                                <p className="text-muted-foreground line-clamp-2">{category.description}</p>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-1 text-primary hover:text-primary/80 font-semibold underline underline-offset-4 decoration-2 hover:decoration-primary transition-colors"
                    >
                        Voir toutes les catégories →
                    </Link>
                </div>
            </div>
        </section>
    );
}
