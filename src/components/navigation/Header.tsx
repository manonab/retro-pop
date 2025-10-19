"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, Search, ShoppingCart, User, Videotape } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/stores/useCart";

export default function RetroPopHeader() {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const count = useCart((s) => s.count());

    const categories = [
        { name: "Jeux rétro", path: "/catalog/games" },
        { name: "Cinéma", path: "/catalog/movies" },
        { name: "Musique", path: "/catalog/music" },
        { name: "Livres", path: "/catalog/books" },
        { name: "Goodies", path: "/catalog/collectibles" },
    ];

    useEffect(() => {
        if (menuOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    function handleSearch() {
        const q = search.trim();
        if (!q) return;
        setMenuOpen(false);
        router.push(`/search?q=${encodeURIComponent(q)}`);
    }

    return (
        <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-retro/85 backdrop-blur supports-[backdrop-filter]:bg-retro/65">
            <div className="container mx-auto px-4">
                {/* Top bar */}
                <div className="flex items-center justify-between h-16">
                    {/* Left: brand + burger (mobile) */}
                    <div className="flex items-center gap-3">
                        {/* Burger (md-) */}
                        <button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center rounded-lg border border-[hsl(var(--border))] p-2"
                            aria-label="Ouvrir le menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu className="w-5 h-5" />
                        </button>

                        <Link href="/" className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 bg-white shadow-sm text-[hsl(var(--retro-blue))]">
                <Videotape className="w-5 h-5 md:w-6 md:h-6" />
              </span>
                            <span className="title-vhs text-xl md:text-3xl">Retro Pop</span>
                        </Link>
                    </div>

                    {/* Search (md+) */}
                    <div className="hidden md:flex items-center gap-2 flex-1 max-w-xl mx-6">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Rechercher un objet rétro..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="search-retro h-11 pl-10 rounded-l-lg border border-[hsl(var(--border))] w-full"
                                aria-label="Rechercher un objet rétro"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--border))] w-4 h-4" />
                        </div>
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="btn-cassette h-11 px-5 rounded-r-lg"
                            aria-label="Rechercher"
                        >
                            Rechercher
                        </button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Search icon (mobile) */}
                        <button
                            type="button"
                            className="md:hidden btn-icon"
                            aria-label="Rechercher"
                            onClick={() => setMenuOpen(true)}
                        >
                            <Search className="w-4 h-4" />
                        </button>

                        {/* Cart */}
                        <Link href="/cart" className="relative">
                            <Button variant="ghost" size="sm" className="font-semibold">
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Panier</span>
                            </Button>
                            {count > 0 && (
                                <span
                                    aria-label={`${count} article${count > 1 ? "s" : ""} dans le panier`}
                                    className="absolute -top-1 -right-2 text-white bg-[hsl(var(--retro-rose))] text-xs font-bold px-1.5 py-0.5 rounded-full"
                                >
                  {count}
                </span>
                            )}
                        </Link>

                        {/* Account */}
                        <Link href="/account">
                            <Button variant="ghost" size="sm" className="font-semibold">
                                <User className="w-4 h-4 mr-1" />
                                <span className="hidden sm:inline">Compte</span>
                            </Button>
                        </Link>

                        {/* CTA */}
                        <Link href="/account/create" className="hidden sm:block">
                            <Button className="btn-sticker">Vendre un objet</Button>
                        </Link>
                    </div>
                </div>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-6 h-12 border-t border-[hsl(var(--border))]">
                    {categories.map((cat) => (
                        <Link key={cat.name} href={cat.path} className="nav-retro text-sm">
                            {cat.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Mobile drawer */}
            <div
                className={[
                    "fixed inset-0 z-[60] md:hidden transition-opacity",
                    menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
                ].join(" ")}
                aria-hidden={!menuOpen}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setMenuOpen(false)}
                />

                {/* Panel */}
                <div
                    role="dialog"
                    aria-modal="true"
                    className={[
                        "absolute top-0 left-0 h-full w-[86%] max-w-sm",
                        "bg-white/6 backdrop-blur-lg backdrop-saturate-150", // 👈 semi-transp + blur
                        "text-white border-r border-white/15 shadow-2xl",
                        "transition-transform duration-300",
                        menuOpen ? "translate-x-0" : "-translate-x-full",
                    ].join(" ")}
                >
                    <div className="flex items-center justify-between h-14 px-4 border-b border-white/15">
                        <span className="title-vhs text-lg text-white">Menu</span> {/* 👈 force white */}
                        <button
                            type="button"
                            className="btn-icon text-white/80 hover:text-white ring-1 ring-white/20 rounded-full"
                            aria-label="Fermer le menu"
                            onClick={() => setMenuOpen(false)}
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    <div className="p-4 border-b border-white/15">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="h-11 w-full pl-10 pr-3 rounded-md bg-white/10 text-white placeholder-white/70
                   border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                                aria-label="Rechercher"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70"/>
                        </div>
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="mt-3 w-full h-10 rounded-md border border-white/20 text-white hover:bg-white/10 transition"
                        >
                            Rechercher
                        </button>
                    </div>

                    <nav className="p-2">
                        <ul className="space-y-1">
                            {categories.map((cat) => (
                                <li key={cat.name}>
                                    <Link
                                        href={cat.path}
                                        className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-white/10 transition"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="nav-retro text-white">{cat.name}</span>
                                        <span aria-hidden className="text-white/60">›</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <Link href="/account/create" onClick={() => setMenuOpen(false)}>
                                <button
                                    className="w-full h-10 rounded-md border border-white/20 hover:bg-white/10 transition">
                                    Vendre
                                </button>
                            </Link>
                            <Link href="/account" onClick={() => setMenuOpen(false)}>
                                <button
                                    className="w-full h-10 rounded-md border border-white/20 hover:bg-white/10 transition">
                                    Mon compte
                                </button>
                            </Link>
                        </div>
                    </nav>
                </div>

            </div>
        </header>
    );
}
