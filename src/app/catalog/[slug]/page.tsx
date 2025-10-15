import CatalogPageClient from "@/components/catalog/CatalogPageClient";
import type { Metadata } from "next";

export async function generateMetadata({
                                           params,
                                       }: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const name = slug.replace(/-/g, " ");
    return {
        title: `Retro Pop — ${name}`,
        description: `Catalogue ${name} sur Retro Pop`,
    };
}

export default async function CategoryPage({
                                               params,
                                           }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <CatalogPageClient slug={slug} />;
}
