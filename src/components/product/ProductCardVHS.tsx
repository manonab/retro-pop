"use client";
import Link from "next/link";
import Image from "next/image";

export default function ProductCardVHS({ p, cover }: { p: any; cover?: string }) {
    return (
        <Link
            href={`/product/${p.slug}`}
            className="group border rounded-2xl overflow-hidden transition-all duration-300 bevel-card hover:shadow-[0_0_24px_hsl(268_48%_46%/.35)] hover:-translate-y-1 jitter"
        >
            {/* Fenêtre image (scanlines) */}
            <div className="relative aspect-[4/3] bg-muted overflow-hidden tape-window">
                {cover && (
                    <Image
                        src={cover}
                        alt={p.title}
                        fill
                        className="object-cover"
                        sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, 100vw"
                    />
                )}
                <div className="absolute inset-0 scanlines opacity-25" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Étiquette papier */}
            <div className="p-0">
                <div className="label-paper px-4 py-3 vhs-notch">
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1 line-clamp-1">
                        {p.category?.name}
                    </div>
                    <div className="font-semibold line-clamp-2 group-hover:text-primary transition-colors chromatic">
                        {p.title}
                    </div>
                    <div className="mt-2 text-primary font-extrabold">{p.price}€</div>
                </div>
            </div>
        </Link>
    );
}
