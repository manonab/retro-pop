"use client";

import { useState } from "react";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";
import Link from "next/link";
import { useCart } from "@/stores/useCart";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const items = useCart((s) => s.items);
    const count = useCart((s) => s.count());
    const remove = useCart((s) => s.remove);
    const clear = useCart((s) => s.clear);
    const syncToServer = useCart((s) => s.syncToServer);


    async function handleCheckout() {
        const { data: { user } } = await supabase.auth.getUser();
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
        { name: "Goodies", path: "/catalog/collectibles" }
    ];

    return (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">R</span>
                        </div>
                        <span className="text-xl font-bold text-foreground">Retro pop</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-2 flex-1 max-w-lg mx-8">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                placeholder="Rechercher un objet vintage..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-card border-border"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        </div>
                        <Button variant="default" size="sm">
                            Rechercher
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                        {/*<Link href="/favorites">*/}
                        {/*    <Button variant="ghost" size="sm" className="hidden sm:flex">*/}
                        {/*        <Heart className="w-4 h-4 mr-1" />*/}
                        {/*        Favoris*/}
                        {/*    </Button>*/}
                        {/*</Link>*/}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm" className="relative">
                                    <ShoppingCart className="w-4 h-4 mr-1" />
                                    <span className="hidden sm:inline">Panier</span>
                                    {count > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center">{count}</span>
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
                                                    <Button variant="outline" size="sm">Continuer mes achats</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="space-y-3 overflow-auto pr-1">
                                                {items.map((it) => (
                                                    <div key={it.product_id} className="flex items-center justify-between rounded-lg border p-3">
                                                        {/*<div className="min-w-0">*/}
                                                        {/*    <Link href={`/product/${it.product_id}`} className="font-medium hover:underline line-clamp-1">*/}
                                                        {/*        {it.product_slug}*/}
                                                        {/*    </Link>*/}
                                                        {/*</div>*/}
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
                                                    <Button variant="outline" className="w-full">Voir le panier</Button>
                                                </Link>
                                                <Button className="w-full" onClick={handleCheckout}>
                                                    Passer au paiement
                                                </Button>
                                                <Button variant="ghost" className="w-full" onClick={() => clear()}>
                                                    Vider le panier
                                                </Button>
                                            </div>
                                        </>
                                    )}
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
                        <Link href="/account/create" className="ml-auto">
                            <Button variant="outline" size="sm">Vendre un objet</Button>
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
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
