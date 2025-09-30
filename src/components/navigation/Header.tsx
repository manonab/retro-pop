"use client"

import { useState } from "react";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import Link from "next/link";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const categories = [
        { name: "Jeux Rétro", path: "/catalog/games" },
        { name: "Cinéma", path: "/catalog/movies" },
        { name: "Musique", path: "/catalog/music" },
        { name: "Livres", path: "/catalog/books" },
        { name: "Goodies", path: "/catalog/collectibles" }
    ];

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
            <div className="container mx-auto px-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/public" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">R</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">RetroMarket</span>
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex items-center space-x-2 flex-1 max-w-lg mx-8">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                placeholder="Rechercher un objet vintage..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-card border-border"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        </div>
                        <Button variant="default" size="sm">
                            Rechercher
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        <Link href="/favorites">
                            <Button variant="ghost" size="sm" className="hidden sm:flex">
                                <Heart className="w-4 h-4 mr-1" />
                                Favoris
                            </Button>
                        </Link>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="relative">
                                    <ShoppingCart className="w-4 h-4 mr-1" />
                                    <span className="hidden sm:inline">Panier</span>
                                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"></span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <div className="py-6">
                                    <h2 className="text-lg font-semibold mb-4">Mon Panier</h2>
                                    <p className="text-muted-foreground">Votre panier est vide</p>
                                </div>
                            </SheetContent>
                        </Sheet>

                        <Link href="/account">
                            <Button variant="ghost" size="sm">
                                <User className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Compte</span>
                            </Button>
                        </Link>

                        {/* Mobile Menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="md:hidden">
                                    <Menu className="w-4 h-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="flex flex-col space-y-4 mt-8">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.name}
                                            href={category.path}
                                            className="text-lg font-medium hover:text-primary transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>

                {/* Navigation - Desktop */}
                <nav className="hidden md:block border-t border-border">
                    <div className="flex items-center space-x-8 h-12">
                        {categories.map((category) => (
                            <Link
                                key={category.name}
                                href={category.path}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                        <Link
                            href="/sell"
                            className="ml-auto"
                        >
                            <Button variant="outline" size="sm">
                                Vendre un objet
                            </Button>
                        </Link>
                    </div>
                </nav>

                {/* Mobile Search */}
                <div className="md:hidden border-t border-border p-4">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-card border-border"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;