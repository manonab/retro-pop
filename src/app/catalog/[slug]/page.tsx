import type { Metadata } from "next";
import CatalogPageClient from "@/components/catalog/CatalogPageClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const name = params.slug.replace(/-/g, " ");
    return {
        title: `Retro Pop — ${name}`,
        description: `Catalogue ${name} sur Retro Pop`,
    };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
    return <CatalogPageClient slug={params.slug} />;
}