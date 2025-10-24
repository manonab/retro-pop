"use client";

import { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Clock, Shield, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";

type Variant = "archive" | "arcade" | "cmyk" | "groovy" | "midcentury";

export default function RetroPopHero({ bgImage = "/hero-marketplace.jpg"}: { variant?: Variant; bgImage?: string; onSearchAction?: () => void; }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const features = [
        { icon: Sparkles, title: "Objets authentiques", description: "Vérifiés par nos experts" },
        { icon: Clock, title: "Voyage dans le temps", description: "Du vintage des années 70–90" },
        { icon: Shield, title: "Achat sécurisé", description: "Garantie satisfait ou remboursé" },
    ];

    const suggestions = ["Star Wars", "Vinyle Nirvana", "Pokemon", "Alien"];

    function doSearch() {
        const q = searchQuery.trim();
        if (!q) return;
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }
    function onKey(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") doSearch();
    }

    return (
        <section className="relative overflow-hidden border-b border-border bg-retro">
            <div className="absolute inset-0 -z-20">
                {!!bgImage && (
                    <Image
                        src={bgImage}
                        alt="Univers Retro Pop"
                        fill
                        className="object-cover opacity-[0.08]"
                        priority
                    />
                )}
            </div>

            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-40 w-[130%] opacity-60"
                 style={{ background: "var(--retro-gradient)" }} />

            <div
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, rgba(0,0,0,.6) 0 2px, transparent 2px 4px)",
                    mixBlendMode: "multiply",
                }}
            />

            <div className="relative container mx-auto px-4 py-16 md:py-24">
                <div className="mx-auto max-w-6xl text-center">
                    {/* Sticker Title VHS */}
                    <h1
                        className="title-vhs inline-block select-none"
                        style={{
                            background:
                                "linear-gradient(90deg, hsl(var(--retro-violet)), hsl(var(--retro-rose)) 45%, hsl(var(--retro-blue)))",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            textShadow:
                                "0 0 0.5em rgba(242,87,149,.25), 0 0 1.2em rgba(119,89,240,.20)",
                        }}
                    >
                        Redonnons vie aux classiques
                    </h1>

                    <div className="divider-retro mx-auto mt-4" />

                    <p className="mt-5 mx-auto max-w-2xl text-[hsl(var(--foreground)/0.78)] text-base md:text-lg">
                        Chasse aux trésors : consoles, vinyles, VHS, affiches et objets cultes —{" "}
                        <span className="font-semibold">sélectionnés, évalués, prêts à revivre</span>.
                    </p>

                    <div className="mt-8 max-w-3xl mx-auto">
                        <div className="flex w-full">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Ex : Zelda, Alien.."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={onKey}
                                    aria-label="Rechercher un objet vintage"
                                    className="search-retro h-12 pl-11 pr-4"
                                />
                            </div>

                            <Button
                                onClick={doSearch}
                                aria-label="Chercher un trésor"
                                className="btn-search shape-diamond h-12 px-4 md:px-5 rounded-r-xl"
                            >
                                <Search className="w-4 h-4 mr-2" />
                                Chercher un trésor
                            </Button>
                        </div>

                        <div className="mt-3 flex flex-wrap justify-center gap-2">
                            {suggestions.map((s) => (
                                <Button
                                    key={s}
                                    onClick={() => setSearchQuery(s)}
                                    className="px-3 py-1.5 text-sm rounded-full border border-[hsl(var(--border))] bg-white hover:border-[hsl(var(--retro-violet))] transition"
                                >
                                    {s}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/catalog">
                            <Button className="btn-sticker">
                                Explorer les catégories <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>

                        <Link href="/account/create" className="hidden sm:block">
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-12 px-6 rounded-xl font-semibold border-2 border-[hsl(var(--retro-violet))] text-[hsl(var(--retro-violet))] hover:bg-[hsl(var(--retro-violet))] hover:text-white"
                            >
                            Vendre un objet
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-10 inline-flex items-center gap-2 rounded-full px-3 py-1 border border-[hsl(var(--border))] bg-white/80 backdrop-blur">
                        <Play className="w-4 h-4 text-[hsl(var(--retro-rose))]" />
                        <span className="text-xs font-semibold tracking-wide uppercase">
              Mode VHS activé
            </span>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 text-left">
                        {features.map(({ icon: Icon, title, description }, i) => (
                            <div key={i} className="card-retro">
                                <div className="w-12 h-12 mb-3 rounded-full grid place-items-center"
                                     style={{ background: "hsl(var(--retro-blue) / .10)", color: "hsl(var(--retro-blue))" }}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-semibold">{title}</h3>
                                <p className="text-sm text-[hsl(var(--foreground)/.65)]">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-32 w-[120%] opacity-55"
                 style={{ background: "var(--retro-gradient-alt)" }} />
        </section>
    );
}
