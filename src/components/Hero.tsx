"use client"

import { useState } from "react";
import { Search, Sparkles, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Image from "next/image";

const Hero = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const features = [
        {
            icon: Sparkles,
            title: "Objets authentiques",
            description: "Vérifiés par nos experts"
        },
        {
            icon: Clock,
            title: "Voyage dans le temps",
            description: "Du vintage des années 70-90"
        },
        {
            icon: Shield,
            title: "Achat sécurisé",
            description: "Garantie satisfait ou remboursé"
        }
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-warm">
            <div className="absolute inset-0">
                <Image
                    src="/hero-marketplace.jpg"
                    fill
                    alt="Marketplace vintage"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90"></div>
            </div>

            <div className="relative container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                        Redonnons vie aux{" "}
                        <span className="bg-gradient-primary bg-clip-text text-transparent">
              classiques
            </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Découvrez, achetez et vendez les trésors vintage qui ont marqué notre époque.
                        Des jeux rétro aux vinyles cultes, en passant par les films et objets de collection.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mb-12">
                        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card/80 backdrop-blur-sm rounded-2xl shadow-card border border-border">
                            <div className="flex-1 relative">
                                <Input
                                    type="text"
                                    placeholder="Ex: Console Nintendo, vinyle Pink Floyd, affiche Jaws..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-0 bg-transparent text-base h-12 pl-12"
                                />
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                            </div>
                            <Button variant="hero" size="lg" className="h-12 px-8">
                                Chercher un trésor
                            </Button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-warm">
                                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button variant="hero" size="lg" className="text-lg h-14 px-8">
                            Explorer les catégories
                        </Button>
                        <Button variant="retro" size="lg" className="text-lg h-14 px-8">
                            Vendre mes objets
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-16 text-center">
                        <p className="text-muted-foreground mb-4">Rejoingnez notre communauté de passionnés</p>
                        <div className="flex justify-center items-center space-x-8 text-sm text-muted-foreground">
                            <div>
                                <span className="text-2xl font-bold text-primary">2,500+</span>
                                <p>Objets disponibles</p>
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-primary">850+</span>
                                <p>Collectionneurs actifs</p>
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-primary">98%</span>
                                <p>Satisfaction client</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;