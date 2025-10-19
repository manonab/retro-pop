"use client";

import Link from "next/link";
import Image from "next/image";
import type { ProductDetailWithSeller } from "@/types/products";

type Props = {
    p: ProductDetailWithSeller;
    cover?: string | null;
};

export default function ProductCardVHS({ p, cover }: Props) {
    const slug = p.slug ?? p.id;

    const CONDITION_STYLE: Record<string, string> = {
        mint: "badge-condition-mint", "très bon": "badge-condition-verygood",
        correct: "badge-condition-correct",
        collector: "badge-condition-collector",
    };

    const conditionKey = (p.condition ?? p.condition ?? "correct").toLowerCase();
    const conditionClass = CONDITION_STYLE[conditionKey] ?? "badge-condition-default";


    console.log(p)
    return (
        <article
            className="
        tape-card group relative isolate overflow-hidden rounded-2xl border border-border bg-card
        transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_0_28px_hsl(271_80%_55%/.25)]
      "
        >
            <Link href={`/product/${slug}`} className="block">
                <div className="relative aspect-[4/3] vhs-notch overflow-hidden rounded-t-2xl">
                    {cover ? (
                        <Image
                            src={cover}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="(min-width:1024px) 25vw, 100vw"
                            priority={false}
                        />
                    ) : (
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--retro-blue)/.22)] to-[hsl(var(--retro-violet)/.22)]"/>
                    )}

                    {/* Wash doux + gradient bas pour lisibilité */}
                    <div className="absolute inset-0 img-wash"/>
                    <div className="absolute inset-0 img-bottom-gradient"/>

                    {/* Scanlines très légères */}
                    <div className="absolute inset-0 scanlines opacity-[0.18]"/>

                    {/* Badge prix (bas-gauche) */}
                    <span className="price-sticker-simple absolute bottom-2 left-2">
                        {p.price} €
                    </span>
                    <div className="absolute top-3 right-3 z-20">
                        <span className={`condition-pill ${conditionClass}`}>
                            {p.condition ?? conditionKey}
                        </span>
                    </div>
                    {/* Action favoris (optionnel) */}
                    {/*                    <button
                        type="button"
                        aria-label="Ajouter aux favoris"
                        onClick={(e) => {
                            e.preventDefault();
                            onFavToggle?.(p.id);
                        }}
                        className="absolute top-3 left-3 z-20 grid place-items-center w-9 h-9 rounded-full bg-white/85 border border-border hover:bg-white transition"
                    >
                        <Heart className="w-4 h-4 text-[hsl(var(--foreground))]"/>
                    </button>*/}
                </div>
            </Link>

            {/* CONTENU */}
            <div className="p-4">
            <Link href={`/product/${slug}`} className="block">
                <h3
                        className="
              vhs-underline text-[hsl(var(--foreground))] font-extrabold tracking-tight leading-snug
              line-clamp-2 group-hover:text-[hsl(var(--retro-violet))] transition-colors
            "
                    >
                        {p.title}
                    </h3>
                </Link>

                <div className="mt-2 flex items-center justify-between text-sm">
                    <div className="text-muted-foreground line-clamp-1">
                        {p.seller?.display_name ?? "Vendeur"}
                    </div>
                </div>

                {/* Ruban VHS décoratif en base */}
                <div className="mt-4 h-1.5 w-full rounded-full" style={{ background: "var(--retro-gradient)" }} />
            </div>
        </article>
    );
}
