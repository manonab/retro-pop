"use client";

import { useMemo, useState, KeyboardEvent } from "react";
import { Star } from "lucide-react";
import type { ProductDetailWithSeller } from "@/types/products";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";
import {TabsList, TabsTrigger, TabsContent, Tabs} from "@/components/ui/Tabs";

type Props = { product: ProductDetailWithSeller };

const ProductDetail = ({ product }: Props) => {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const images = useMemo(
        () =>
            (product.product_images ?? [])
                .slice()
                .sort((a, b) => (a.position ?? 0) - (b.position ?? 0)),
        [product.product_images]
    );

    const cover = images[selectedImage]?.url;
    const isConditionObject =
        product && typeof product.condition === "object" && product.condition !== null;


    return (
        <div className="min-h-screen bg-retro">
            <div className="container mx-auto px-4 py-8">
                {/* ==== Top layout ==== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                    {/* Left — Gallery */}
                    <div className="lg:col-span-7">
                        <div className="relative mb-4">
                            <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-2xl tape-window bevel-card vhs-notch isolate">
                                {cover && (
                                    <Image
                                        src={cover}
                                        alt={product.title}
                                        fill
                                        className="object-cover z-0"
                                        priority
                                    />
                                )}
                                {/* VHS overlays (soft) */}
                                <div className="absolute inset-0 z-10 img-wash" />
                                <div className="absolute inset-0 z-10 img-bottom-gradient" />
                                <div className="absolute inset-0 z-10 scanlines opacity-[.16] pointer-events-none" />

                                {/* Rarity / condition */}
                                {!!product.rarity && (
                                    <span className="absolute top-4 left-4 z-20 condition-pill badge-condition-collector">
                    {product.rarity}
                  </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="flex flex-wrap gap-3">
                                {images.map((img, i) => (
                                    <button
                                        key={img.id ?? i}
                                        onClick={() => setSelectedImage(i)}
                                        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
                                            if (e.key === "ArrowRight") setSelectedImage((n) => Math.min(images.length - 1, n + 1));
                                            if (e.key === "ArrowLeft") setSelectedImage((n) => Math.max(0, n - 1));
                                        }}
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all focus:outline-none focus:ring-2 focus:ring-[hsl(var(--retro-violet))] ${
                                            selectedImage === i
                                                ? "border-[hsl(var(--retro-violet))]"
                                                : "border-border hover:border-[hsl(var(--retro-violet)/.6)]"
                                        }`}
                                        aria-label={`Voir l’image ${i + 1}`}
                                    >
                                        <Image
                                            src={img.url}
                                            alt={`${product.title} — ${i + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right — Info / Buy box */}
                    <aside className="lg:col-span-5">
                        <div className="lg:sticky lg:top-24 space-y-5">
                            {/* Title */}
                            <h1 className="title-vhs" style={{ WebkitTextStroke: "1px hsl(var(--retro-violet)/.5)" }}>
                                {product.title}
                            </h1>

                            {/* Condition + mini rating */}
                            <div className="flex flex-wrap items-center gap-2">
                                {isConditionObject ? (
                                    <span className="condition-pill badge-condition-verygood">État : détails</span>
                                ) : (
                                    !!product.condition && (
                                        <span className="condition-pill badge-condition-verygood">
                      {String(product.condition)}
                    </span>
                                    )
                                )}
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span className="text-sm">Qualité vérifiée</span>
                                </div>
                            </div>

                            {/* Price & CTA */}
                            <div className="label-paper vhs-notch rounded-xl p-5 bevel-card">
                                <div className="flex items-end justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <span className="price-sticker-simple">{product.price}€</span>
                                    </div>
                                    <AddToCartButton productId={product.id} />
                                </div>
                                <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                                    <div>✅ Paiement sécurisé</div>
                                    <div>📦 Colis suivi</div>
                                </div>
                            </div>

                            {/* Seller card */}
                            <div className="bg-card border border-border rounded-xl p-4 bevel-card">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-xs text-muted-foreground">Vendu par</div>
                                        <div className="font-semibold">
                                            {product.seller?.display_name ?? "Vendeur"}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-amber-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <span className="text-sm">Fiable</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <Tabs defaultValue="description" className="mb-16">
                    <TabsList className="grid w-full grid-cols-3 rounded-xl overflow-hidden border border-border bg-card">
                        <TabsTrigger value="description" className="font-semibold" variant="vhs">
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="specs" className="font-semibold" variant="vhs">
                            Caractéristiques
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                        <div className="prose prose-neutral max-w-none">
                            <div className="whitespace-pre-line text-foreground">
                                {product.description || "—"}
                            </div>
                        </div>
                    </TabsContent>

                    {/* Caractéristiques */}
                    <TabsContent value="specs" className="mt-6">
                        {isConditionObject ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(product.condition).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="flex items-center justify-between px-3 py-2 bg-card rounded-lg border border-border"
                                    >
                                        <span className="font-medium text-foreground">{key}</span>
                                        <span className="text-muted-foreground">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-muted-foreground">Pas de caractéristiques détaillées.</div>
                        )}
                    </TabsContent>

                </Tabs>


                {/* ==== Trust bar ==== */}
                <section className="border-t border-border pt-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-muted-foreground">
                        <div>
                            <div className="text-foreground font-semibold">Paiements sécurisés</div>
                            <div className="text-sm">CB, Visa, Mastercard</div>
                        </div>
                        <div>
                            <div className="text-foreground font-semibold">Livraison soignée</div>
                            <div className="text-sm">Emballages renforcés</div>
                        </div>
                        <div>
                            <div className="text-foreground font-semibold">Communauté passionnée</div>
                            <div className="text-sm">Acheteurs & vendeurs vérifiés</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductDetail;
