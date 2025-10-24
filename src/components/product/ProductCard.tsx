"use client";

import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import type { ProductDetail, ProductRarity} from "@/types/products";

const rarityColors: Record<NonNullable<ProductRarity>, string> = {
    RARE: "bg-accent text-accent-foreground electric-glow",
    EPIC: "bg-secondary text-secondary-foreground cyber-glow",
    LEGENDARY: "bg-primary text-primary-foreground pulse-rainbow",
    COMMON: "bg-accent text-accent-foreground cyber-glow",
};

type Props = ProductDetail;

export default function ProductCard(p: Props) {

    return (
        <Card className="group overflow-hidden cyber-glow hover-electric transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <Link href={`/product/${p.slug}`} className="block">
                <div className="relative overflow-hidden h-48 bg-muted">

                    {p.rarity && (
                        <Badge className={`absolute top-2 left-2 ${rarityColors[p.rarity]}`}>
                            {p.rarity.toUpperCase()}
                        </Badge>
                    )}

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm hover:bg-black/40 cyber-glow"
                        aria-label="Ajouter aux favoris"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>

                <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-neon-cyan transition-colors">
                            {p.title}
                        </h3>
                        {p.category?.name && (
                            <Badge variant="outline" className="text-xs border-primary/30">
                                {p.category.name}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs cyber-glow">
                            {p.condition}
                        </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-neon-cyan">
                            {p.price}€
                            </span>
                        </div>

                        <Button size="sm" className="electric-glow hover-electric gradient-cyberpunk">
                            Ajouter
                        </Button>
                    </div>
                </CardContent>
            </Link>
        </Card>
    );
}
