"use client";

import Link from "next/link";
import { useCategories } from "@/query/useCatalog";
import {CATEGORY_ICON_MAP, CATEGORY_GRADIENT_BY_SLUG, DEFAULT_GRADIENT} from "@/lib/services/catalog";
import Image from "next/image";

type Category = {
    id: number | string;
    name: string;
    slug: string;
    icon_key?: string;
    gradient?: string;
    count?: number;
    description?: string;
    image_url?: string;
};

const CategoryGrid = () => {
    const { data } = useCategories();

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Explorez nos univers vintage
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Chaque catégorie recèle des trésors uniques.
                        Plongez dans l&apos;univers qui vous passionne et découvrez des pépites rares.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data?.map((category: Category) => {
                        const iconKey = (category.icon_key ?? "tag") as keyof typeof CATEGORY_ICON_MAP;
                        const Icon = CATEGORY_ICON_MAP[iconKey] ?? CATEGORY_ICON_MAP.tag;
                        const gradient = CATEGORY_GRADIENT_BY_SLUG[category.slug] ?? DEFAULT_GRADIENT;

                        return (
                            <Link
                                key={category.id}
                                href={`/catalog/${category.slug}`}
                                className="group block"
                            >
                                <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-card hover:shadow-warm transition-all duration-300 transform hover:scale-105">
                                    <div className="relative h-48 overflow-hidden">
                                        {category.image_url ? (
                                                <Image
                                                    src={category.image_url}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"/>
                                        )}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`}></div>

                                        <div className="absolute top-4 right-4">
                                            <div
                                                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                <Icon className="h-6 w-6 text-foreground"/>
                                            </div>
                                        </div>

                                        {typeof category.count === "number" && (
                                            <div className="absolute bottom-4 left-4">
                                                <div
                                                    className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                                                    {category.count}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        {category.description && (
                                            <p className="text-muted-foreground">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/catalog"
                        className="text-primary hover:text-primary/80 font-semibold underline underline-offset-4 decoration-2 hover:decoration-primary transition-colors"
                    >
                        Voir toutes les catégories →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
