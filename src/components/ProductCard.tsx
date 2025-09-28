import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Image from "next/image";

interface ProductCardProps {
    title: string;
    price: string;
    originalPrice?: string;
    image: string;
    condition: string;
    rarity?: "rare" | "epic" | "legendary";
    seller: string;
    rating: number;
    year?: string;
}

const ProductCard = ({
                         title,
                         price,
                         originalPrice,
                         image,
                         condition,
                         rarity,
                         seller,
                         rating,
                         year
                     }: ProductCardProps) => {
    const rarityColors = {
        rare: "bg-accent text-accent-foreground electric-glow",
        epic: "bg-secondary text-secondary-foreground cyber-glow",
        legendary: "bg-primary text-primary-foreground pulse-rainbow"
    };

    return (
        <Card className="group overflow-hidden cyber-glow hover-electric transition-all duration-300 bg-card/80 backdrop-blur-sm">
            <div className="relative overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    width={100}
                    height={100}
                    priority
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {rarity && (
                    <Badge className={`absolute top-2 left-2 ${rarityColors[rarity]} font-bold text-xs`}>
                        {rarity.toUpperCase()}
                    </Badge>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm hover:bg-black/40 cyber-glow"
                >
                    <Heart className="w-4 h-4" />
                </Button>
            </div>

            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-neon-cyan transition-colors">
                        {title}
                    </h3>
                    {year && (
                        <Badge variant="outline" className="text-xs border-primary/30">
                            {year}
                        </Badge>
                    )}
                </div>

                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs cyber-glow">
                        {condition}
                    </Badge>
                </div>

                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        <span>{rating}</span>
                        <span>• {seller}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-neon-cyan">{price}€</span>
                        {originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                {originalPrice}€
              </span>
                        )}
                    </div>
                    <Button size="sm" className="electric-glow hover-electric gradient-cyberpunk">
                        Ajouter
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;