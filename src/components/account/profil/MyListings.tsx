"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useMyProducts } from "@/queries/useMyProducts";
import { ProductBase } from "@/types/products";
import { useRouter } from "next/navigation";
import DeleteProductModal from "@/components/account/profil/DeleteProductModal";
import {Button} from "@/components/ui/Button";

export default function MyListings({ userId }: { userId: string }) {
    const { data: products = [], isLoading, isError, error } = useMyProducts(userId);
    const router = useRouter();

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mes annonces</CardTitle>
                <Link href="/account/create">
                    <Button>Créer une annonce</Button>
                </Link>
            </CardHeader>

            <CardContent>
                {isLoading && <div>Chargement…</div>}
                {isError && <div className="text-red-500">Erreur : {(error as Error).message}</div>}
                {!isLoading && products.length === 0 && (
                    <div className="text-muted-foreground">Aucune annonce pour le moment.</div>
                )}

                <div className="space-y-3">
                    {products.map((product: ProductBase) => (
                        <Link href={`/product/${product.slug}`} key={product.id}>
                            <div
                                key={product.id}
                                className="border rounded-md p-3 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    {product.product_images?.[0]?.url && (
                                        <Image
                                            height={200}
                                            width={200}
                                            src={product.product_images[0].url}
                                            alt={product.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    )}
                                    <div>
                                        <div className="font-medium">{product.title}</div>
                                        <div className="text-sm text-muted-foreground">
                                            {product.price} {product.currency} ·{" "}
                                            {new Date(product.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link href={`/account/products/${product.slug}/edit`}>
                                        <Button variant="secondary">Éditer</Button>
                                    </Link>

                                    <DeleteProductModal
                                        productId={product.id}
                                        productTitle={product.title}
                                        trigger={
                                            <Button variant="destructive">
                                                Supprimer
                                            </Button>
                                        }
                                        onDeletedAction={async () => router.refresh()}
                                        userId={userId}
                                    />
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
