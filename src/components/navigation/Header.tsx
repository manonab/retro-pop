"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Videotape} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/stores/useCart";

export default function RetroPopHeader() {
    const [search, setSearch] = useState("");
    const count = useCart((s) => s.count());

    const categories = [
        { name: "Jeux rétro", path: "/catalog/games" },
        { name: "Cinéma", path: "/catalog/movies" },
        { name: "Musique", path: "/catalog/music" },
        { name: "Livres", path: "/catalog/books" },
        { name: "Goodies", path: "/catalog/collectibles" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-retro border-b border-[hsl(var(--border))] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* --- Brand --- */}
                    <Link href="/" className="flex items-center gap-4">
  <span className="grid place-items-center w-12 h-12 rounded-full border-2 bg-white shadow-sm text-[hsl(var(--retro-blue))]">
    <Videotape className="w-6 h-6" />
  </span>
                        <span className="title-vhs text-2xl md:text-3xl">Retro Pop</span>
                    </Link>


                    {/* --- Desktop Search --- */}
                    <div className="hidden md:flex items-center gap-2 flex-1 max-w-lg mx-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Rechercher un objet rétro..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="search-retro h-11 pl-10 rounded-l-lg border border-[hsl(var(--border))]"
                                aria-label="Rechercher un objet rétro"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--border))] w-4 h-4" />
                        </div>

                        {/* bouton “cassette tab” (biseaux) */}
                        <button
                            className="btn-cassette h-11 px-5 rounded-r-lg"
                            aria-label="Rechercher"
                        >
                            Rechercher
                        </button>
                    </div>

                    {/* --- Mobile Search (icône seule) --- */}
                    <div className="md:hidden border-t border-[hsl(var(--border))] py-3">
                        <div className="flex items-center gap-2">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="search-retro h-11 pl-10"
                                    aria-label="Rechercher"
                                />
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--border))] w-4 h-4" />
                            </div>

                            {/* bouton icône rond */}
                            <button className="btn-icon" aria-label="Lancer la recherche">
                                <Search className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* --- Actions --- */}
                    <div className="flex items-center gap-3">
                        {/* Panier */}
                        <Link href="/cart" className="relative">
                            <Button variant="ghost" size="sm" className="font-semibold">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Panier
                            </Button>
                            {count > 0 && (
                                <span className="absolute -top-1 -right-2 text-white bg-[hsl(var(--retro-rose))] text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {count}
                </span>
                            )}
                        </Link>

                        {/* Compte */}
                        <Link href="/account">
                            <Button variant="ghost" size="sm" className="font-semibold">
                                <User className="w-4 h-4 mr-1" />
                                Compte
                            </Button>
                        </Link>

                        {/* CTA */}
                        <Link href="/account/create">
                            <Button className="btn-sticker">Vendre un objet</Button>
                        </Link>
                    </div>
                </div>

                {/* --- Navigation --- */}
                <nav className="hidden md:flex items-center gap-8 h-12 border-t border-[hsl(var(--border))]">
                    {categories.map((cat) => (
                        <Link key={cat.name} href={cat.path} className="nav-retro text-sm">
                            {cat.name}
                        </Link>
                    ))}
                </nav>

                {/* --- Mobile Search --- */}
                <div className="md:hidden border-t border-[hsl(var(--border))] py-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="search-retro pl-10"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--border))] w-4 h-4" />
                    </div>
                </div>
            </div>
        </header>
    );
}
