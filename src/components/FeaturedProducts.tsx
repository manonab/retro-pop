import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
    const products = [
        {
            title: "The Legend of Zelda: Ocarina of Time",
            price: "89",
            originalPrice: "120",
            image: "/zeldaOcarina.jpg",
            condition: "Très bon état",
            rarity: "legendary" as const,
            seller: "RetroGamer47",
            rating: 4.9,
            year: "1998"
        },
        {
            title: "Pulp Fiction - Édition Collector",
            price: "45",
            image: "/pulpFiction.jpg",
            condition: "Bon état",
            rarity: "rare" as const,
            seller: "CinéVintage",
            rating: 4.7,
            year: "1994"
        },
        {
            title: "Pokémon Rouge - Version Française",
            price: "65",
            image: "/pokemonRed.jpg",
            condition: "Excellent état",
            rarity: "epic" as const,
            seller: "NostalgieGamer",
            rating: 4.8,
            year: "1996"
        },
        {
            title: "The Dark Side of the Moon - Vinyl",
            price: "75",
            originalPrice: "95",
            image: "/darkSideVinyl.jpg",
            condition: "Très bon état",
            seller: "VinylCollector",
            rating: 5.0,
            year: "1973"
        },
        {
            title: "Dune - Édition Originale",
            price: "180",
            image: "/duneBook.jpg",
            condition: "Bon état",
            rarity: "legendary" as const,
            seller: "BiblioRare",
            rating: 4.6,
            year: "1965"
        },
        {
            title: "Figurine Link - First 4 Figures",
            price: "210",
            image: "/linkFigurine.jpg",
            condition: "Neuf",
            rarity: "epic" as const,
            seller: "CollectoMania",
            rating: 4.9,
            year: "2017"
        }
    ];

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4 text-neon-magenta pulse-cyber">Pépites du moment</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Découvrez une sélection de pièces rares et authentiques,
                        dénichées par notre communauté de passionnés.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={index}
                            {...product}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="gradient-rainbow text-primary-foreground px-8 py-3 rounded-lg font-semibold electric-glow hover-electric">
                        Voir tout le catalogue
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;