import { Heart, Mail, MessageCircle, Shield, Truck } from "lucide-react";

const Footer = () => {
    return (
        <footer className="gradient-neon-bg border-t border-border/50 mt-20">
            <div className="container mx-auto px-4 py-12">
                {/* Trust indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="text-center group">
                        <Shield className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-secondary transition-colors cyber-glow" />
                        <h3 className="font-semibold mb-2 text-neon-cyan">Paiements sécurisés</h3>
                        <p className="text-sm text-muted-foreground">
                            Transactions protégées et vendeurs vérifiés
                        </p>
                    </div>
                    <div className="text-center group">
                        <Truck className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-accent transition-colors electric-glow" />
                        <h3 className="font-semibold mb-2 text-neon-cyan">Livraison soignée</h3>
                        <p className="text-sm text-muted-foreground">
                            Emballage professionnel pour protéger vos trésors
                        </p>
                    </div>
                    <div className="text-center group">
                        <Heart className="w-12 h-12 mx-auto mb-4 text-primary group-hover:text-secondary transition-colors pulse-cyber" />
                        <h3 className="font-semibold mb-2 text-neon-cyan">Communauté passionnée</h3>
                        <p className="text-sm text-muted-foreground">
                            Rejoignez des milliers de collectionneurs
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h4 className="font-semibold mb-4 text-neon-magenta">Catalogue</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/catalog/games" className="text-muted-foreground hover:text-primary hover-neon transition-colors">Jeux vidéo</a></li>
                            <li><a href="/catalog/movies" className="text-muted-foreground hover:text-secondary hover-neon transition-colors">Films & Séries</a></li>
                            <li><a href="/catalog/books" className="text-muted-foreground hover:text-accent hover-neon transition-colors">Livres & BD</a></li>
                            <li><a href="/catalog/music" className="text-muted-foreground hover:text-primary hover-neon transition-colors">Musique</a></li>
                            <li><a href="/catalog/collectibles" className="text-muted-foreground hover:text-secondary hover-neon transition-colors">Goodies</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-neon-magenta">Vendre</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-muted-foreground hover:text-primary hover-neon transition-colors">Créer une annonce</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-secondary hover-neon transition-colors">Guide du vendeur</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-accent hover-neon transition-colors">Estimation gratuite</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary hover-neon transition-colors">Frais de vente</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-neon-magenta">Aide</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-muted-foreground hover:text-primary hover-neon transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-secondary hover-neon transition-colors">Guide acheteur</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-accent hover-neon transition-colors">Livraison & retours</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary hover-neon transition-colors">Authentification</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4 text-neon-magenta">Contact</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground hover:text-primary hover-neon transition-colors">
                                <Mail className="w-4 h-4" />
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground hover:text-secondary hover-neon transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span>Chat en direct</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-border/30 pt-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-8 h-8 gradient-electric rounded-lg flex items-center justify-center pulse-rainbow">
                            <span className="text-lg font-bold text-primary-foreground">R</span>
                        </div>
                        <span className="text-lg font-bold text-neon-cyan">Retro Pop</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © 2025 RetroPop. Fait avec passion pour les collectionneurs.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;