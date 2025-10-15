"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import { useCart } from "@/stores/useCart";
import { supabase } from "@/lib/supabaseClient";

export default function RetroPopHeader({
                                           variant = "arcade",
                                           showPromo = true,
                                       }: {
    variant?: "arcade" | "cmyk" | "groovy" | "midcentury";
    showPromo?: boolean;
}) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const items = useCart((s) => s.items);
    const count = useCart((s) => s.count());
    const remove = useCart((s) => s.remove);
    const clear = useCart((s) => s.clear);
    const syncToServer = useCart((s) => s.syncToServer);

    async function handleCheckout() {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
            router.push("/login?redirect=/checkout");
            return;
        }
        await syncToServer({ mergeOnSync: true });
        router.push("/checkout");
    }

    const categories = [
        { name: "Jeux Rétro", path: "/catalog/games" },
        { name: "Cinéma", path: "/catalog/movies" },
        { name: "Musique", path: "/catalog/music" },
        { name: "Livres", path: "/catalog/books" },
        { name: "Goodies", path: "/catalog/collectibles" },
    ];

    const variantBg = {
        arcade:
            "from-background/95 to-background/80 arcade-scanlines backdrop-blur supports-[backdrop-filter]:bg-background/75",
        cmyk:
            "from-background/95 to-background/80 cmyk-halftone backdrop-blur supports-[backdrop-filter]:bg-background/75",
        groovy:
            "from-background/95 to-background/80 groovy-stripes backdrop-blur supports-[backdrop-filter]:bg-background/75",
        midcentury:
            "from-background/95 to-background/80 midcentury-arches backdrop-blur supports-[backdrop-filter]:bg-background/75",
    }[variant];

    return (
        <header className="sticky top-0 z-50 border-b border-border">
            {/* Main bar */}
            <div
                className={`bg-gradient-to-b ${variantBg} border-t border-border shadow-soft`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Brand */}
                        <Link href="/" className="group flex items-center gap-2">
                            <div className="relative w-9 h-9 rounded-xl overflow-hidden sticker grid place-items-center bg-primary text-primary-foreground shadow-card">
                                <span className="font-black text-lg leading-none">R</span>
                                <span className="absolute inset-0 arcade-grid opacity-20" />
                            </div>
                            <span className="text-xl font-extrabold tracking-tight shadow-type">
                Retro Pop
              </span>
                        </Link>

                        {/* Search (desktop) */}
                        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-6">
                            <div className="relative flex-1">
                                <Input
                                    type="text"
                                    placeholder="Rechercher un objet vintage…"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 bg-card border-border focus-visible:ring-2 focus-visible:ring-ring"
                                    aria-label="Rechercher"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            </div>
                            <Button size="sm" aria-label="Rechercher">Rechercher</Button>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                            {/* Favorites (optional / uncomment to enable) */}
                            {/*
              <Link href="/favorites">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <Heart className="w-4 h-4 mr-1" />
                  Favoris
                </Button>
              </Link>
              */}

                            {/* Cart */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="sm" className="relative">
                                        <ShoppingCart className="w-4 h-4 mr-1" />
                                        <span className="hidden sm:inline">Panier</span>
                                        {count > 0 && (
                                            <span
                                                className="price-tag absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-1 leading-none min-w-[22px] grid place-items-center"
                                                aria-live="polite"
                                                aria-atomic
                                            >
                        {count}
                      </span>
                                        )}
                                    </Button>
                                </SheetTrigger>

                                <SheetContent className="w-[420px] sm:w-[480px]">
                                    <div className="py-6 h-full flex flex-col">
                                        <h2 className="text-lg font-semibold mb-4">Mon Panier</h2>

                                        {items.length === 0 ? (
                                            <div className="text-muted-foreground">
                                                Ton panier est vide.
                                                <div className="mt-4">
                                                    <Link href="/">
                                                        <Button variant="outline" size="sm">
                                                            Continuer mes achats
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="space-y-3 overflow-auto pr-1">
                                                    {items.map((it) => (
                                                        <div
                                                            key={it.product_id}
                                                            className="flex items-center justify-between rounded-lg border p-3 bevel-card"
                                                        >
                                                            <div className="min-w-0 flex-1 mr-2">
                                                                {/*<Link*/}
                                                                {/*    href={`/product/${it.product_id}`}*/}
                                                                {/*    className="font-medium hover:underline line-clamp-1"*/}
                                                                {/*>*/}
                                                                {/*    {it. ?? "Article"}*/}
                                                                {/*</Link>*/}
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-600"
                                                                onClick={() => remove(it.product_id)}
                                                            >
                                                                Supprimer
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="mt-4 flex flex-col gap-2">
                                                    <Link href="/cart">
                                                        <Button variant="outline" className="w-full">
                                                            Voir le panier
                                                        </Button>
                                                    </Link>
                                                    <Button className="w-full" onClick={handleCheckout}>
                                                        Passer au paiement
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full"
                                                        onClick={() => clear()}
                                                    >
                                                        Vider le panier
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>

                            {/* Account */}
                            <Link href="/account">
                                <Button variant="ghost" size="sm">
                                    <User className="w-4 h-4 mr-1" />
                                    <span className="hidden sm:inline">Compte</span>
                                </Button>
                            </Link>

                            {/* Mobile menu */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="sm" className="md:hidden">
                                        <Menu className="w-4 h-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left">
                                    <nav className="flex flex-col gap-4 mt-8">
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
                        <div className="flex items-center gap-6 h-12">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.path}
                                    className="relative text-sm font-semibold text-muted-foreground hover:text-primary transition-colors after:absolute after:-bottom-2 after:left-0 after:h-[3px] after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
                                >
                                    {category.name}
                                </Link>
                            ))}

                            <Link href="/account/create" className="ml-auto">
                                <Button variant="outline" size="sm" className="sticker">
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
                                placeholder="Rechercher…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-card border-border"
                                aria-label="Rechercher"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
