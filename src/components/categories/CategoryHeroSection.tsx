"use client";
import Image from "next/image";
import { CATEGORY_ICON_MAP } from "@/lib/services/catalog";
import {CategoryLite} from "@/types/products";

export default function CategoryHeroVHS({ category, total }: { category: CategoryLite; total: number; }) {
    const Icon =
        CATEGORY_ICON_MAP[(category.icon_key ?? "tag") as keyof typeof CATEGORY_ICON_MAP] ??
        CATEGORY_ICON_MAP.tag;

    return (
        <section className="vhs-scope relative h-48 md:h-64 border-b border-border overflow-hidden">
            <div className="absolute inset-0 bg-secondary"/>
            {category.banner_url && (
                <Image src={category.banner_url}  alt={category.name} fill
                       className="object-cover mix-blend-luminosity opacity-35" priority/>
            )}
            <div className="absolute inset-0 scanlines opacity-25"/>
            <div className="absolute inset-0 tape-noise opacity-35"/>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/55"/>
            <div className="relative container mx-auto px-4 h-full flex items-end pb-6">
                <div className="flex items-center gap-3 text-white">
                    <div className="w-12 h-12 bg-white/95 rounded-xl grid place-items-center sticker">
                        <Icon className="w-6 h-6 text-foreground"/>
                    </div>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold chromatic">{category.name}</h1>
                        <p className="text-sm opacity-85">Total : {total}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
