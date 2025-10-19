"use client";

import {useCategories} from "@/queries/useCatalog";
import {CategoryCardItem} from "@/components/categories/CategoryCard";

export function CategoryGrid() {
    const {data: categories, isLoading, error} = useCategories();

    if (isLoading) {
        return (
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="title-vhs">Explorez nos univers vintage</h2>
                        <div className="divider-retro mx-auto mt-3"/>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({length: 6}).map((_, i) => (
                            <div key={i} className="h-72 rounded-2xl border border-border bg-card animate-pulse"/>
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
                    <div className="divider-retro mx-auto mt-3"/>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Chaque catégorie recèle des trésors uniques. Plongez dans l&apos;univers qui vous passionne et
                        découvrez des pépites rares.
                    </p>
                </div>

                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories && categories.map((c) => (
                            <CategoryCardItem key={c.id} category={c}/>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
