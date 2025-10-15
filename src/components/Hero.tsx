"use client";

import { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Clock, Shield, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type Variant = "archive" | "arcade" | "cmyk" | "groovy" | "midcentury";

export default function RetroPopHero({
                                         variant = "archive",
                                         bgImage = "/hero-marketplace.jpg",
                                         onSearch,
                                     }: {
    variant?: Variant;
    bgImage?: string;
    onSearch?: (q: string) => void;
}) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const features = [
        { icon: Sparkles, title: "Objets authentiques", description: "Vérifiés par nos experts" },
        { icon: Clock, title: "Voyage dans le temps", description: "Du vintage des années 70-90" },
        { icon: Shield, title: "Achat sécurisé", description: "Garantie satisfait ou remboursé" },
    ];

    const suggestions: string[] = ["Game Boy", "Vinyle Pink Floyd", "Affiche Jaws", "Walkman Sony"];

    function doSearch() {
        const q = searchQuery.trim();
        if (!q) return;
        onSearch ? onSearch(q) : router.push(`/search?q=${encodeURIComponent(q)}`);
    }

    function onKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") doSearch();
    }

    const variantBg: Record<Variant, string> = {
        archive: "", // on gère l'ambiance via noise/scanlines + voile en dégradé
        arcade: "arcade-sunrise arcade-scanlines",
        cmyk: "cmyk-halftone",
        groovy: "groovy-stripes",
        midcentury: "midcentury-arches",
    };

    return (
        <section className="relative overflow-hidden border-b border-border">
            {/* Background image + overlays sobres */}
            <div className="absolute inset-0 -z-10">
                {!!bgImage && (
                    <Image
                        src={bgImage}
                        alt="Marketplace vintage"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                )}

                {/* motif optionnel selon variant (pas utilisé en 'archive') */}
                {variant !== "archive" && <div className={`absolute inset-0 ${variantBg[variant]} opacity-[.18]`} />}

                {/* voile doux pour lisibilité */}
                <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/78 to-background/95" />
            </div>

            {/* tape counter discret en haut à droite */}
            <div className="absolute right-4 top-4 z-10 tape-counter text-xs md:text-sm select-none">
                00:12:47
            </div>

            <div className="relative container mx-auto px-4 py-16 md:py-24">
                <div className="text-center max-w-4xl mx-auto vhs-noise vhs-scanlines rounded-2xl">
                    {/* Heading */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground text-center leading-tight">
                        Redonnons vie aux{" "}
                        <span className="relative inline-block align-baseline">
              <span className="px-3 py-1.5 sticker-vhs is-paper sticker-gloss label-corners text-dusk soft">
                classiques
              </span>
            </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Découvrez, achetez et vendez les trésors vintage qui ont marqué notre époque. Des jeux rétro aux
                        vinyles cultes, en passant par les films et objets de collection.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-6">
                        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card/85 backdrop-blur-sm rounded-2xl vhs-card">
                            <div className="flex-1 relative">
                                <Input
                                    type="text"
                                    placeholder="Ex: Console Nintendo, vinyle Pink Floyd, affiche Jaws…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={onKey}
                                    className="border-0 bg-transparent text-base h-12 pl-12"
                                    aria-label="Rechercher un objet vintage"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            </div>
                            <Button variant="hero" className="h-12 px-8" onClick={doSearch} aria-label="Chercher un trésor">
                                Chercher un trésor
                            </Button>
                        </div>
                    </div>

                    {/* Suggestion chips (étiquettes papier sobres) */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                        {suggestions.map((s) => (
                            <button
                                key={s}
                                onClick={() => setSearchQuery(s)}
                                aria-label={`Suggestion ${s}`}
                                className="sticker-vhs is-paper sticker-gloss label-corners text-sm px-3 py-1.5 transition hover:translate-y-[-1px]"
                                data-tone="cream"
                            >
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Features (cartes jaquettes sobres) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                        {features.map((f, i) => (
                            <div key={i} className="vhs-card p-5">
                                <div className="w-14 h-14 mb-4 rounded-full grid place-items-center bg-muted text-foreground">
                                    <f.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-base font-semibold mb-1">{f.title}</h3>
                                <p className="text-muted-foreground text-sm">{f.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="hero" size="lg" className="text-lg h-14 px-8">
                            Explorer les catégories
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="sticker-vhs is-paper label-corners px-6 h-14 text-base"
                            aria-label="Vendre un objet"
                            data-tone="cream"
                        >
                            Vendre un objet
                        </Button>
                    </div>

                    {/* Trust marks */}
                    <div className="mt-14 text-center">
                        <p className="text-muted-foreground mb-4">Rejoignez notre communauté de passionnés</p>
                        <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
                            <div>
                                <span className="text-2xl font-extrabold text-foreground">2,500+</span>
                                <p>Objets disponibles</p>
                            </div>
                            <div>
                                <span className="text-2xl font-extrabold text-foreground">850+</span>
                                <p>Collectionneurs actifs</p>
                            </div>
                            <div>
                                <span className="text-2xl font-extrabold text-foreground">98%</span>
                                <p>Satisfaction client</p>
                            </div>
                        </div>
                    </div>

                    {/* petit bandeau décoratif “jaquette” en bas */}
                    <div className="mt-10 h-8 rounded-xl stripes-dusk soft" />
                </div>
            </div>
        </section>
    );
}
