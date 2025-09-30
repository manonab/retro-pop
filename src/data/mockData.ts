export type Category = {
    id: string;
    name: string;
    slug: string;
};

export type Conditions = {
    name: string;
    checked: boolean;
};

export type Rarities = {
    name: string;
    checked: boolean;
};

export type Product = {
    id: string;
    title: string;
    slug: string;
    description: string;
    rarity?: "rare" | "epic" | "legendary";
    price: number;
    originalPrice?: number;
    condition: "Mint" | "Très bon" | "Bon" | "Correct";
    inStock: number;
    year?: number;
    category: Category;
    rating: number;
    image: string[];   // ✅ tableau obligatoire
    seller?: string;
};

export const categories: Category[] = [
    { id: "1", name: "Jeux vidéo", slug: "games" },
    { id: "2", name: "Cinéma", slug: "movies" },
    { id: "3", name: "Musique", slug: "music" },
    { id: "4", name: "Livres", slug: "books" },
    { id: "5", name: "Figurines", slug: "collectibles" },
];

export const conditions: Conditions[] = [
    { name: "Excellent État", checked: false },
    { name: "Très Bon État", checked: false },
    { name: "Bon État", checked: false },
    { name: "État Correct", checked: false },
];

export const rarities: Rarities[] = [
    { name: "Légendaire", checked: false },
    { name: "Très Rare", checked: false },
    { name: "Rare", checked: false },
    { name: "Commun", checked: false },
];

export const products: Product[] = [
    {
        id: "p1",
        title: "The Legend of Zelda: Ocarina of Time (N64)",
        slug: "zelda-ocarina-n64",
        description:
            "Cartouche originale de Zelda Ocarina of Time pour Nintendo 64. Édition PAL, boîte incluse.",
        price: 49.9,
        originalPrice: 59.99,
        year: 1998,
        condition: "Très bon",
        inStock: 1,
        category: categories[0],
        image: ["https://www.kingdom-figurine.fr/wp-content/uploads/2018/09/LINK-STATUETTE-THE-LEGEND-OF-ZELDA-SKYWARD-SWORD-TOGETHER-25-CM-%E2%80%93-1-3700789291367-%E2%80%93-kingdom-figurine.fr_.jpg"],
        rarity: "legendary",
        rating: 5,
        seller: "RetroGamesShop",
    },
    {
        id: "p2",
        title: "Figurine Link collector",
        slug: "figurine-link",
        description: "Superbe figurine de Link en édition collector. Hauteur 25 cm, détails peints à la main.",
        price: 79.9,
        originalPrice: 89.99,
        year: 2005,
        condition: "Mint",
        inStock: 2,
        category: categories[4],
        image: ["https://www.kingdom-figurine.fr/wp-content/uploads/2018/09/LINK-STATUETTE-THE-LEGEND-OF-ZELDA-SKYWARD-SWORD-TOGETHER-25-CM-%E2%80%93-1-3700789291367-%E2%80%93-kingdom-figurine.fr_.jpg"],
        rarity: "epic",
        rating: 4,
        seller: "GeekCollection",
    },
    {
        id: "p3",
        title: "Pokémon Rouge (Game Boy)",
        slug: "pokemon-red",
        description: "Cartouche originale de Pokémon Rouge pour Game Boy. Sauvegarde fonctionnelle, étiquette en bon état.",
        price: 59.9,
        originalPrice: 39.99,
        year: 1996,
        condition: "Bon",
        inStock: 1,
        category: categories[0],
        image: ["/pokemonRed.jpg"],
        rarity: "legendary",
        rating: 5,
        seller: "VintageGamesFR",
    },
    {
        id: "p4",
        title: "Vinyle Pink Floyd – The Dark Side of the Moon",
        slug: "vinyle-dark-side",
        description: "Édition originale vinyle de 1973, pochette en bon état. Son légendaire de Pink Floyd.",
        price: 29.9,
        originalPrice: 8.99,
        year: 1973,
        condition: "Correct",
        inStock: 2,
        category: categories[2],
        image: ["/darkSideVinyl.jpg"],
        rarity: "rare",
        rating: 4,
        seller: "VinylCollector",
    },
    {
        id: "p5",
        title: "Dune – Édition vintage",
        slug: "dune-book",
        description: "Édition originale française du livre Dune, couverture usée mais pages intactes.",
        price: 19.9,
        originalPrice: 12.99,
        year: 1984,
        condition: "Bon",
        inStock: 3,
        category: categories[3],
        image: ["/duneBook.jpg"],
        rarity: "rare",
        rating: 3,
        seller: "BookAntiqua",
    },
    {
        id: "p6",
        title: "Pulp Fiction (VHS Collector)",
        slug: "pulp-fiction-vhs",
        description: "Cassette VHS collector du film culte Pulp Fiction. Pochette d'origine incluse.",
        price: 14.9,
        originalPrice: 19.99,
        year: 1994,
        condition: "Très bon",
        inStock: 2,
        category: categories[1],
        image: ["/pulpFiction.jpg"],
        rarity: "epic",
        rating: 5,
        seller: "CinemaRetro",
    },
];

export function getProductById(id: string) {
    return products.find((p) => p.id === id) ?? null;
}

export function getProductBySlug(slug: string) {
    return products.find(p => p.slug === slug) ?? null;
}

export function getSimilarProducts(product: Product) {
    return products.filter((p) => p.category.id === product.category.id && p.id !== product.id);
}
