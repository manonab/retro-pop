import { Search, ShoppingCart, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 gradient-neon-bg border-b border-border/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 gradient-electric rounded-lg flex items-center justify-center cyber-glow pulse-cyber">
                            <span className="text-xl font-bold text-primary-foreground">R</span>
                        </div>
                        <h1 className="text-2xl font-bold text-neon-cyan">Retro Pop</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-foreground hover:text-primary hover-neon transition-colors">Jeux</a>
                        <a href="#" className="text-foreground hover:text-secondary hover-neon transition-colors">Films</a>
                        <a href="#" className="text-foreground hover:text-accent hover-neon transition-colors">Livres</a>
                        <a href="#" className="text-foreground hover:text-primary hover-neon transition-colors">Musique</a>
                        <a href="#" className="text-foreground hover:text-secondary hover-neon transition-colors">Goodies</a>
                    </nav>

                    {/* Search */}
                    <div className="flex-1 max-w-md mx-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Rechercher une pépite rétro..."
                                className="pl-10 bg-muted/50 border-border focus:border-primary cyber-glow"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="cyber-glow hover-electric">
                            <Heart className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="cyber-glow hover-electric">
                            <ShoppingCart className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="cyber-glow hover-electric">
                            <User className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;