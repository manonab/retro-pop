import ProductCard from "./ProductCard";
import { products } from "@/data/mockData";

const FeaturedProducts = () => {
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