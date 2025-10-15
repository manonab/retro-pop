import { Button } from "@/components/ui/Button";
import { Search, Gamepad2, Film, Book, Music, Gift } from "lucide-react";

const HeroSection = () => {
    const categories = [
        { icon: Gamepad2, label: "Jeux", count: "2.5k+" },
        { icon: Film, label: "Films", count: "1.8k+" },
        { icon: Book, label: "Livres", count: "3.2k+" },
        { icon: Music, label: "Musique", count: "1.5k+" },
        { icon: Gift, label: "Goodies", count: "980+" },
    ];

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 gradient-neon-bg" />

            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10"
                 style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.6'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                     animation: "gradient-shift 10s ease infinite"
                 }}
            />

            <div className="container relative z-10 mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-neon-cyan pulse-cyber">
                        Redonnez vie aux <span className="block text-electric animate-pulse"> classiques
            </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                        La marketplace où collectionneurs et passionnés se retrouvent pour acheter, vendre et
                        découvrir les trésors rétro d'hier et d'aujourd'hui.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                        <Button size="lg" className="electric-glow text-lg px-8 py-3 gradient-cyberpunk hover-electric">
                            <Search className="w-5 h-5 mr-2" />
                            Explorer le catalogue
                        </Button>
                        <Button variant="outline" size="lg" className="cyber-glow text-lg px-8 py-3 border-primary text-primary hover-neon">
                            Vendre mes objets
                        </Button>
                    </div>

                    {/* Categories */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="bg-card/50 backdrop-blur-sm rounded-lg p-4 cyber-glow hover-electric cursor-pointer group"
                            >
                                <category.icon className="w-8 h-8 mx-auto mb-2 text-primary group-hover:text-secondary transition-colors" />
                                <h3 className="font-semibold text-foreground mb-1 group-hover:text-neon-cyan">{category.label}</h3>
                                <p className="text-xs text-muted-foreground">{category.count} articles</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;