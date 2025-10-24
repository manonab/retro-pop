import Link from "next/link";
import Image from "next/image";
import { CATEGORY_ICON_MAP } from "@/lib/services/catalog";
import type { CategoryLite } from "@/types/products";

type IconComp = React.ComponentType<{ className?: string }>;

export function CategoryCardItem({ category }: { category: CategoryLite }) {
    const iconKey = (category.icon_key ?? "tag") as keyof typeof CATEGORY_ICON_MAP;
    const Icon = (CATEGORY_ICON_MAP[iconKey] ?? CATEGORY_ICON_MAP.tag) as IconComp;

    return (
        <Link href={`/catalog/${category.slug}`} className="group block">
            <article
                className="
          relative overflow-hidden rounded-2xl border border-border bg-card
          transition-all duration-300
          hover:-translate-y-1 hover:scale-[1.02]
          hover:shadow-[0_0_28px_hsl(271_80%_55%/.25)]
        "
            >
                <div className="relative aspect-[4/3] px-4 pt-4 pb-1">
                    <div className="relative h-full overflow-hidden rounded-2xl isolate">
                        {category.image_url ? (
                            <Image
                                src={category.image_url}
                                alt={category.name}
                                fill
                                sizes="(min-width:1024px) 33vw, 100vw"
                                className="object-cover z-0"
                            />
                        ) : (
                            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[hsl(var(--retro-blue)/.15)] to-[hsl(var(--retro-violet)/.15)]" />
                        )}

                        <div className="absolute inset-0 z-10 bg-[hsl(var(--background)/.25)] mix-blend-multiply" />
                        <div className="absolute inset-0 scanlines opacity-25" />
                        <div className="absolute inset-0 tape-noise opacity-30" />
                        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[hsl(var(--retro-violet)/.5)] via-transparent to-transparent" />
                    </div>

                    <div className="absolute top-4 right-4">
                        <div className="sticker sticker-paper rounded-xl px-2.5 py-2 shadow-[var(--shadow-retro)]">
                            <Icon className="w-5 h-5 text-foreground" />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="label-paper rounded-xl p-4">
                        <h3 className="text-xl font-bold mb-1 transition-colors chromatic group-hover:text-[hsl(var(--retro-violet))]">
                            {category.name}
                        </h3>
                    </div>

                    <div className="mt-4">
            <span className="inline-flex items-center gap-1 text-[hsl(var(--retro-rose))] font-semibold underline underline-offset-4 decoration-2 hover:opacity-85 transition-opacity">
              Voir la catégorie →
            </span>
                    </div>
                </div>

                <div
                    aria-hidden
                    className="absolute bottom-0 left-0 right-0 h-1.5 opacity-80"
                    style={{ background: "var(--retro-gradient)" }}
                />
            </article>
        </Link>
    );
}
