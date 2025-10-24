"use client";

import Link from "next/link";
import { Heart, Mail, MessageCircle, Shield, Truck } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-retro border-t border-border/60 relative">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -rotate-1 h-2 w-[110%] opacity-80"
                style={{ background: "var(--retro-gradient)" }}
            />

            <div className="container mx-auto px-4 py-12">
                <section
                    className="label-paper rounded-2xl p-5 md:p-6 border border-border bevel-card mb-10"
                    aria-labelledby="trust"
                >
                    <h2 id="trust" className="sr-only">Confiance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="group">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full grid place-items-center"
                                 style={{ background: "hsl(var(--retro-blue)/.12)", color: "hsl(var(--retro-blue))" }}>
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-foreground">Paiements sécurisés</h3>
                            <p className="text-sm text-muted-foreground">Transactions protégées & vendeurs vérifiés</p>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full grid place-items-center"
                                 style={{ background: "hsl(var(--retro-violet)/.12)", color: "hsl(var(--retro-violet))" }}>
                                <Truck className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-foreground">Livraison soignée</h3>
                            <p className="text-sm text-muted-foreground">Emballages renforcés & suivi</p>
                        </div>
                        <div className="group">
                            <div className="w-12 h-12 mx-auto mb-3 rounded-full grid place-items-center"
                                 style={{ background: "hsl(var(--retro-rose)/.12)", color: "hsl(var(--retro-rose))" }}>
                                <Heart className="w-6 h-6" />
                            </div>
                            <h3 className="font-semibold text-foreground">Communauté passionnée</h3>
                            <p className="text-sm text-muted-foreground">Des milliers de collectionneurs</p>
                        </div>
                    </div>
                </section>

                <nav className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10" aria-label="Pied de page">
                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Catalogue</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/catalog/games" className="text-muted-foreground hover:text-[hsl(var(--retro-violet))]">Jeux vidéo</Link></li>
                            <li><Link href="/catalog/movies" className="text-muted-foreground hover:text-[hsl(var(--retro-rose))]">Films & Séries</Link></li>
                            <li><Link href="/catalog/books" className="text-muted-foreground hover:text-[hsl(var(--retro-orange))]">Livres & BD</Link></li>
                            <li><Link href="/catalog/music" className="text-muted-foreground hover:text-[hsl(var(--retro-blue))]">Musique</Link></li>
                            <li><Link href="/catalog/collectibles" className="text-muted-foreground hover:text-[hsl(var(--retro-violet))]">Figurines</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Vendre</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/sell/new" className="text-muted-foreground hover:text-[hsl(var(--retro-violet))]">Créer une annonce</Link></li>
                            <li><Link href="/help/seller" className="text-muted-foreground hover:text-[hsl(var(--retro-rose))]">Guide du vendeur</Link></li>
                            <li><Link href="/estimate" className="text-muted-foreground hover:text-[hsl(var(--retro-blue))]">Estimation gratuite</Link></li>
                            <li><Link href="/fees" className="text-muted-foreground hover:text-[hsl(var(--retro-orange))]">Frais de vente</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Aide</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/help/faq" className="text-muted-foreground hover:text-[hsl(var(--retro-violet))]">FAQ</Link></li>
                            <li><Link href="/help/buyer" className="text-muted-foreground hover:text-[hsl(var(--retro-rose))]">Guide acheteur</Link></li>
                            <li><Link href="/help/shipping" className="text-muted-foreground hover:text=[hsl(var(--retro-blue))]">Livraison & retours</Link></li>
                            <li><Link href="/help/authentication" className="text-muted-foreground hover:text-[hsl(var(--retro-orange))]">Authentification</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Contact</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <a href="mailto:hello@retropop.example" className="hover:text-[hsl(var(--retro-violet))]">
                                    hello@retropop.example
                                </a>
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <MessageCircle className="w-4 h-4" />
                                <Link href="/contact" className="hover:text-[hsl(var(--retro-rose))]">
                                    Chat en direct
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="border-t border-border/40 pt-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg grid place-items-center"
                             style={{ background: "var(--retro-gradient)" }}>
                            <span className="text-white text-sm font-black">R</span>
                        </div>
                        <span className="text-lg font-extrabold"
                              style={{
                                  background: "linear-gradient(90deg,hsl(var(--retro-blue)),hsl(var(--retro-violet)))",
                                  WebkitBackgroundClip: "text",
                                  color: "transparent",
                              }}>
              Retro Pop
            </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2025 RetroPop — Fait avec passion pour les collectionneurs.
                    </p>
                </div>
            </div>

            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 rotate-1 h-2 w-[105%] opacity-80"
                style={{ background: "var(--retro-gradient-alt)" }}
            />
        </footer>
    );
};

export default Footer;
