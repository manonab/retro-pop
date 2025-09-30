"use client"

import { useState } from "react";
import { Heart, Share2, Star, Shield, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {ProductDetailWithSeller} from "@/types/products";
import Image from "next/image";

type Props = {
    product: ProductDetailWithSeller;
}

const ProductDetail = ({product} : Props) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [selectedImage, setSelectedImage] = useState<number>(0);
    console.log(product.product_images)
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Images Section */}
                    <div>
                        <div className="relative mb-4">
                            <Image
                                src={product.product_images[selectedImage].url}
                                alt={product.title}
                                width={800}
                                height={800}
                                className="w-full h-96 object-cover rounded-lg shadow-card"
                            />
                            {/* Favorite Button */}
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-colors ${
                                    isFavorite
                                        ? "bg-red-500 text-white"
                                        : "bg-white/80 text-gray-700 hover:bg-white"
                                }`}
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                            </button>
                            {/* Rarity Badge */}
                            <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                                {product.rarity}
                            </Badge>
                        </div>

                        {/* Image Thumbnails */}
                        <div className="flex space-x-2">
                            {product.product_images.map((image, index) => (
                                <Button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`w-20 h-20 rounded-lg border-2 transition-colors ${
                                        selectedImage === index
                                            ? "border-primary"
                                            : "border-border hover:border-primary/50"
                                    }`}
                                >
                                    <Image
                                        src={image.url}
                                        width={800}
                                        height={800}
                                        alt={`${product.title} - Vue ${index + 1}`}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
                            <Button variant="ghost" size="sm">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex items-center space-x-4 mb-6">
                            <Badge variant="outline">{product.condition}</Badge>
                            <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-4xl font-bold text-primary">{product.price}€</span>
                        </div>

                        {/* Seller Info */}
                        <div className="bg-card p-4 rounded-lg border border-border mb-6">
                            <h3 className="font-semibold mb-2">Vendu par {product.seller?.display_name}</h3>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                </div>
                            </div>
                        </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Button variant="hero" size="lg" className="w-full">
                                    Ajouter au panier
                                </Button>
                            </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="text-center">
                                <Shield className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground">Paiement sécurisé</p>
                            </div>
                            <div className="text-center">
                                <Truck className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            </div>
                            <div className="text-center">
                                <RotateCcw className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <p className="text-xs text-muted-foreground">Retours 14j</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Details Tabs */}
                <Tabs defaultValue="description" className="mb-16">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
                        <TabsTrigger value="shipping">Livraison</TabsTrigger>
                    </TabsList>

                    <TabsContent value="description" className="mt-6">
                        <div className="prose prose-neutral max-w-none">
                            <div className="whitespace-pre-line text-foreground">
                                {product.description}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="specifications" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(product.condition).map(([key, value]) => (
                                <div key={key} className="flex justify-between p-3 bg-card rounded-lg">
                                    <span className="font-medium text-foreground">{key}</span>
                                    <span className="text-muted-foreground">{value}</span>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                </Tabs>

                {/* Similar Products */}
{/*                <section>
                    <h2 className="text-2xl font-bold text-foreground mb-8">Produits similaires</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {similarProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                </section>*/}
            </div>
        </div>
    );
};

export default ProductDetail;