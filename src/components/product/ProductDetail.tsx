"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import type { ProductDetailWithSeller } from "@/types/products";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";

type Props = { product: ProductDetailWithSeller };

const ProductDetail = ({ product }: Props) => {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const images = useMemo(
        () =>
            (product.product_images ?? [])
                .slice()
                .sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0)),
        [product.product_images]
    );

    const cover = images[selectedImage]?.url;

    const isConditionObject =
        product && typeof product.condition === "object" && product.condition !== null;

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* ==== Top layout ==== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
                    {/* Left — Gallery */}
                    <div className="lg:col-span-7">
                        <div className="relative mb-4">
                            <div className="relative w-full h-[420px] md:h-[520px] overflow-hidden rounded-2xl tape-window bevel-card">
                                {cover && (
                                    <Image
                                        src={cover}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                )}
                                {/* VHS overlays */}
                                <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />
                                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                                {/* Rarity badge */}
                                {!!product.rarity && (
                                    <Badge className="absolute top-4 left-4 border-0 bg-secondary text-secondary-foreground">
                                        {product.rarity}
                                    </Badge>
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
                                        className={`relative w-20 h-20 rounded-xl overflow-hidden border transition-all ${
                                            selectedImage === i
                                                ? "border-primary ring-2 ring-primary/30"
                                                : "border-border hover:border-primary/50"
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
                        <div className="lg:sticky lg:top-24 space-y-4">
                            <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
                                {product.title}
                            </h1>

                            {/* Condition + mini rating */}
                            <div className="flex flex-wrap items-center gap-2">
                                {isConditionObject ? (
                                    <Badge variant="outline">État: Voir détails</Badge>
                                ) : (
                                    !!product.condition && <Badge variant="outline">{product.condition}</Badge>
                                )}
                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="w-4 h-4 fill-current"/>
                                    <span className="text-sm">Qualité vérifiée</span>
                                </div>
                            </div>

                            {/* Price & CTA */}
                            <div className="label-paper vhs-notch rounded-xl p-5 bevel-card">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="relative sticker sticker-vhs sticker-gloss px-4 py-2 text-white text-xl font-extrabold">
                                                {product.price}€
                                            </div>
                                        </div>
                                    </div>
                                    <AddToCartButton productId={product.id}/>
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
                                        <Star className="w-4 h-4 fill-current"/>
                                        <span className="text-sm">Fiable</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>

                {/* ==== Tabs (description / specs / livraison) ==== */}
                <Tabs defaultValue="description" className="mb-16">
                    <TabsList className="grid w-full grid-cols-3 rounded-xl overflow-hidden">
                        <TabsTrigger value="description"
                                     className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                            Description
                        </TabsTrigger>
                        <TabsTrigger value="specs" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                            Caractéristiques
                        </TabsTrigger>
                        <TabsTrigger value="shipping" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                            Livraison
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                        <div className="prose prose-neutral max-w-none">
                            <div className="whitespace-pre-line text-foreground">
                                {product.description || "—"}
                            </div>
                        </div>
                    </TabsContent>

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

                    <TabsContent value="shipping" className="mt-6">
                        <div className="grid sm:grid-cols-3 gap-3">
                            <div className="bg-card border border-border rounded-lg p-3">
                                <div className="text-xs text-muted-foreground">Préparation</div>
                                <div className="font-medium">48h</div>
                            </div>
                            <div className="bg-card border border-border rounded-lg p-3">
                                <div className="text-xs text-muted-foreground">Transport</div>
                                <div className="font-medium">Colis suivi</div>
                            </div>
                            <div className="bg-card border border-border rounded-lg p-3">
                                <div className="text-xs text-muted-foreground">Retours</div>
                                <div className="font-medium">14 jours</div>
                            </div>
                        </div>
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
