"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { useMyProducts } from "@/queries/useMyProducts";
import { ProductBase } from "@/types/products";
import { useRouter } from "next/navigation";
import DeleteProductModal from "@/components/account/profil/DeleteProductModal";
import { Button } from "@/components/ui/Button";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function MyListings({ userId }: { userId: string }) {
    const { data: products = [], isLoading, isError, error } = useMyProducts(userId);
    const router = useRouter();

    return (
        <Card className="bevel-card">
            <CardHeader className="flex items-start gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="title-vhs m-0">Mes annonces</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        {isLoading ? "Chargement…" : `${products.length} annonce${products.length > 1 ? "s" : ""}`}
                    </p>
                </div>
                <Link href="/account/create" className="w-full md:w-auto">
                    <button className="btn-sticker w-full md:w-auto inline-flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" /> Créer une annonce
                    </button>
                </Link>
            </CardHeader>

            <CardContent className="pt-0">
                {/* Error */}
                {isError && (
                    <div className="rounded-xl border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
                        Erreur : {(error as Error).message}
                    </div>
                )}

                {/* Empty */}
                {!isLoading && !isError && products.length === 0 && (
                    <div className="mt-4 rounded-xl border border-border bg-card p-8 text-center">
                        <div className="text-4xl mb-2">📼</div>
                        <p className="text-muted-foreground">Aucune annonce pour le moment.</p>
                        <Link href="/account/create" className="inline-block mt-4">
                            <button className="btn-sticker">Créer ma première annonce</button>
                        </Link>
                    </div>
                )}

                {/* Skeleton */}
                {isLoading && (
                    <ul className="mt-2 space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <li
                                key={i}
                                className="rounded-xl border border-border bg-white p-3 grid grid-cols-[88px_1fr] gap-3 animate-pulse"
                            >
                                <div className="w-[88px] aspect-[4/3] rounded-lg bg-muted" />
                                <div className="space-y-2">
                                    <div className="h-4 w-2/3 bg-muted rounded" />
                                    <div className="h-3 w-1/3 bg-muted rounded" />
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {/* List */}
                {!isLoading && products.length > 0 && (
                    <ul className="mt-2 space-y-3">
                        {products.map((p: ProductBase) => {
                            const img = p.product_images?.[0]?.url ?? null;
                            const status = (p)?.status as string | undefined;

                            return (
                                <li
                                    key={p.id}
                                    className="
                    rounded-2xl border border-border bg-white transition
                    hover:shadow-[0_6px_18px_rgba(0,0,0,.06)]
                  "
                                >
                                    <div
                                        className="
                      grid grid-cols-[96px_1fr_auto] gap-3 p-3
                      md:grid-cols-[132px_1fr_auto] md:gap-4 md:p-4
                    "
                                    >
                                        {/* Thumb */}
                                        <Link href={`/product/${p.slug}`} className="shrink-0">
                                            <div className="relative w-[96px] md:w-[132px] aspect-[4/3] rounded-lg overflow-hidden">
                                                {img ? (
                                                    <>
                                                        <Image src={img} alt={p.title} fill className="object-cover" />
                                                        <div className="absolute inset-0 img-wash" />
                                                        <div className="absolute inset-0 img-bottom-gradient" />
                                                        <div className="absolute inset-0 scanlines opacity-[.10]" />
                                                    </>
                                                ) : (
                                                    <div className="grid place-items-center h-full w-full text-xs text-muted-foreground">—</div>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Infos */}
                                        <div className="min-w-0">
                                            <Link href={`/product/${p.slug}`} className="block">
                                                <h3 className="font-extrabold leading-snug text-foreground line-clamp-2">
                                                    {p.title}
                                                </h3>
                                            </Link>

                                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                                <span className="price-sticker-simple">{p.price} {p.currency}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <time dateTime={p.created_at} className="truncate">
                                                    {new Date(p.created_at).toLocaleDateString()}
                                                </time>
                                                {status && (
                                                    <>
                                                        <span className="hidden sm:inline">•</span>
                                                        <span
                                                            className={`px-2 py-0.5 rounded-full border text-xs ${
                                                                status === "published"
                                                                    ? "border-[hsl(var(--retro-mint))] text-[hsl(var(--retro-mint))] bg-[hsl(var(--retro-mint)/.08)]"
                                                                    : "border-[hsl(var(--retro-orange))] text-[hsl(var(--retro-orange))] bg-[hsl(var(--retro-orange)/.08)]"
                                                            }`}
                                                        >
                              {status}
                            </span>
                                                    </>
                                                )}
                                            </div>

                                            {/* Actions (mobile) */}
                                            <div className="mt-3 grid grid-cols-2 gap-2 md:hidden">
                                                <Link href={`/account/products/${p.slug}/edit`}>
                                                    <Button variant="outline" className="w-full rounded-lg justify-center">
                                                        <Pencil className="w-4 h-4 mr-2" /> Éditer
                                                    </Button>
                                                </Link>
                                                <DeleteProductModal
                                                    productId={p.id}
                                                    productTitle={p.title}
                                                    trigger={
                                                        <Button variant="destructive" className="w-full rounded-lg justify-center">
                                                            <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                                                        </Button>
                                                    }
                                                    onDeletedAction={async () => router.refresh()}
                                                    userId={userId}
                                                />
                                            </div>
                                        </div>

                                        {/* Actions (desktop) */}
                                        <div className="hidden md:flex items-center gap-2 self-start">
                                            <Link href={`/account/products/${p.slug}/edit`}>
                                                <Button variant="outline" className="rounded-lg">
                                                    <Pencil className="w-4 h-4 mr-2" /> Éditer
                                                </Button>
                                            </Link>
                                            <DeleteProductModal
                                                productId={p.id}
                                                productTitle={p.title}
                                                trigger={
                                                    <Button variant="destructive" className="rounded-lg">
                                                        <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                                                    </Button>
                                                }
                                                onDeletedAction={async () => router.refresh()}
                                                userId={userId}
                                            />
                                        </div>
                                    </div>

                                    {/* Liseré VHS sobre */}
                                    <div aria-hidden className="h-[3px] rounded-b-2xl" style={{ background: "var(--retro-gradient)" }} />
                                </li>
                            );
                        })}
                    </ul>
                )}
            </CardContent>

            <Link href="/account/create" className="fixed md:hidden bottom-6 right-6">
                <Button
                    className="btn-sticker rounded-full h-12 w-12 p-0 grid place-items-center shadow-lg"
                    aria-label="Créer une annonce"
                    title="Créer une annonce"
                >
                    <Plus className="text-white"  />
                </Button>
            </Link>
        </Card>
    );
}
