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
        { name: "Figurines", path: "/catalog/collectibles" },
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
        <header
            className={[
                "sticky top-0 z-50 border-b border-[hsl(var(--border))]",
                menuOpen
                    ? "bg-white dark:bg-neutral-950"
                    : "bg-retro/85 backdrop-blur supports-[backdrop-filter]:bg-retro/65",
            ].join(" ")}
        >
            <div className="container mx-auto px-4">
                {/* Top bar */}
                <div className="flex items-center justify-between h-16">
                    {/* Left: brand + burger (mobile) */}
                    <div className="flex items-center gap-3">
                        {/* Burger (md-) */}
                        <Button
                            type="button"
                            className="md:hidden inline-flex items-center justify-center rounded-lg border border-[hsl(var(--border))] p-2"
                            aria-label="Ouvrir le menu"
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(true)}
                        >
                            <Menu className="w-5 h-5"/>
                        </Button>

                        <Link href="/" className="flex items-center gap-3">
              <span
                  className="grid place-items-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 bg-white shadow-sm text-[hsl(var(--retro-blue))]">
                <Videotape className="w-5 h-5 md:w-6 md:h-6"/>
              </span>
                            <span className="title-vhs text-md md:text-3xl">Retro Pop</span>
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
                            <Search
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--border))] w-4 h-4"/>
                        </div>
                        <Button
                            type="button"
                            onClick={handleSearch}
                            className="btn-cassette h-11 px-5 rounded-r-lg"
                            aria-label="Rechercher"
                        >
                            Rechercher
                        </Button>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <div className="md:hidden lg:hidden">
                            <Button
                                type="button"
                                className="btn-icon"
                                aria-label="Rechercher"
                                onClick={() => setMenuOpen(true)}
                            >
                                <Search className="w-4 h-4"/>
                            </Button>
                        </div>

                        {/* Cart */}
                        <Link href="/cart" className="relative">
                            <Button variant="ghost" size="sm" className="font-semibold">
                                <ShoppingCart className="w-4 h-4 mr-1"/>
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
                                <User className="w-4 h-4 mr-1"/>
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
                className={["fixed inset-0 z-[60] md:hidden transition-opacity", menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",].join(" ")}
                aria-hidden={!menuOpen}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/40"
                    onClick={() => setMenuOpen(false)}
                />

                <div
                    role="dialog"
                    aria-modal="true"
                    className={[
                        "absolute top-0 left-0 h-full w-[86%] max-w-sm",
                        "bg-white text-foreground dark:bg-neutral-900",    // ✅ opaque
                        "border-r border-[hsl(var(--border))] shadow-2xl",
                        "transition-transform duration-300",
                        menuOpen ? "translate-x-0" : "-translate-x-full",
                    ].join(" ")}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between h-14 px-4 border-b border-[hsl(var(--border))]">
                        <span className="title-vhs text-lg text-foreground">Menu</span> {/* ✅ force la couleur */}
                        <Button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full p-2 hover:bg-[hsl(var(--background-alt))]"
                            aria-label="Fermer le menu"
                            onClick={() => setMenuOpen(false)}
                        >
                            <X className="w-5 h-5 text-foreground"/>
                        </Button>
                    </div>

                    {/* Search */}
                    <div className="p-4 border-b border-[hsl(var(--border))]">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Rechercher…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="h-11 w-full pl-10 pr-3 rounded-md
                   bg-white text-foreground placeholder-muted-foreground
                   border border-[hsl(var(--border))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--border))]/50"
                                aria-label="Rechercher"
                            />
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--border))]"/>
                        </div>
                        <Button
                            type="button"
                            onClick={handleSearch}
                            className="mt-3 w-full h-10 rounded-md border border-[hsl(var(--border))] hover:bg-[hsl(var(--background-alt))] transition"
                        >
                            Rechercher
                        </Button>
                    </div>

                    <nav className="p-2">
                        <ul className="space-y-1">
                            {categories.map((cat) => (
                                <li key={cat.name}>
                                    <Link
                                        href={cat.path}
                                        className="flex items-center justify-between rounded-lg px-3 py-3 hover:bg-[hsl(var(--background-alt))] transition"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span
                                            className="text-foreground font-medium">{cat.name}</span> {/* ✅ pas .nav-retro */}
                                        <span aria-hidden className="text-[hsl(var(--border))]">›</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                            <Link href="/account/create" onClick={() => setMenuOpen(false)}>
                                <Button
                                    className="w-full h-10 rounded-md border border-[hsl(var(--border))] hover:bg-[hsl(var(--background-alt))] transition">
                                    Vendre
                                </Button>
                            </Link>
                            <Link href="/account" onClick={() => setMenuOpen(false)}>
                                <Button
                                    className="w-full h-10 rounded-md border border-[hsl(var(--border))] hover:bg-[hsl(var(--background-alt))] transition">
                                    Mon compte
                                </Button>
                            </Link>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
