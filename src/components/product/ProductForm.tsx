"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { PRODUCT_CONDITIONS, PRODUCT_STATUSES, PRODUCT_RARITIES, type ProductCondition, type ProductRarity, type ProductStatus, type CategoryLite } from "@/types/products";

export type ProductFormValues = {
    title: string;
    description?: string;
    price: number;
    currency: string;
    category_id: number;
    rarity: ProductRarity;
    condition: ProductCondition;
    status: ProductStatus;
    images: File[];
};

type Props = {
    mode: "create" | "edit";
    initialValues: ProductFormValues;
    categories: CategoryLite[];
    isSubmitting?: boolean;
    onSubmit: (values: ProductFormValues) => Promise<void> | void;
};

export default function ProductForm({ mode, initialValues, categories, isSubmitting, onSubmit }: Props) {
    const [title, setTitle] = useState(initialValues.title);
    const [description, setDescription] = useState(initialValues.description ?? "");
    const [price, setPrice] = useState(String(initialValues.price ?? ""));
    const [currency, setCurrency] = useState(initialValues.currency ?? "EUR");
    const [categoryId, setCategoryId] = useState<number>(initialValues.category_id);
    const [rarity, setRarity] = useState<ProductRarity>(initialValues.rarity);
    const [condition, setCondition] = useState<ProductCondition>(initialValues.condition);
    const [status, setStatus] = useState<ProductStatus>(initialValues.status);
    const [images, setImages] = useState<FileList | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!title.trim()) return alert("Titre requis");
        const priceNum = Number(price);
        if (!Number.isFinite(priceNum)) return alert("Prix invalide");
        if (!PRODUCT_CONDITIONS.includes(condition)) return alert("Condition invalide");
        if (!PRODUCT_STATUSES.includes(status)) return alert("Statut invalide");
        if (rarity && !PRODUCT_RARITIES.includes(rarity)) return alert("Rareté invalide");

        await onSubmit({
            title,
            description,
            price: priceNum,
            currency,
            category_id: categoryId,
            rarity: rarity,
            condition,
            status,
            images: images ? Array.from(images) : [],
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Titre */}
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">Titre</label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Console rétro..." required />
            </div>

            {/* Description */}
            <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Décrivez votre produit..." />
            </div>

            {/* Prix + Devise */}
            <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                    <label htmlFor="price" className="block text-sm font-medium mb-1">Prix</label>
                    <Input id="price" type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="currency" className="block text-sm font-medium mb-1">Devise</label>
                    <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </div>
            </div>

            {/* Catégorie */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Catégorie</label>
                <select
                    id="category"
                    className="w-full border rounded px-3 py-2 bg-background"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                >
                    <option value="">—</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                </select>
            </div>

            {/* État (condition) */}
            <label htmlFor="condition" className="block text-sm font-medium mb-1">État (condition)</label>
            <select
                id="condition"
                className="w-full border rounded px-3 py-2 bg-background"
                value={condition}
                onChange={(e) => setCondition(e.target.value as ProductCondition)}
            >
                {PRODUCT_CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Statut */}
            <span className="block text-sm font-medium mb-1">Statut</span>
            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                    <input type="radio" name="status" value="paused" checked={status === "paused"} onChange={() => setStatus("paused")} />
                    Brouillon
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="status" value="active" checked={status === "active"} onChange={() => setStatus("active")} />
                    Publier
                </label>
            </div>

            {/* Rareté */}
            <div>
                <label htmlFor="rarity" className="block text-sm font-medium mb-1">Rareté</label>
                <select
                    id="rarity"
                    className="w-full border rounded px-3 py-2 bg-background"
                    value={rarity ?? ""}
                    onChange={(e) => setRarity((e.target.value) as ProductRarity)}
                >
                    {PRODUCT_RARITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* Images */}
            <div>
                <label htmlFor="images" className="block text-sm font-medium mb-1">Images</label>
                <Input id="images" type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
                <p className="text-xs text-muted-foreground mt-1">Ajoute au moins 1 image. La première sera l’aperçu.</p>
            </div>

            <Button type="submit" disabled={!!isSubmitting}>
                {isSubmitting ? (mode === "create" ? "Création..." : "Enregistrement...") : (mode === "create" ? "Publier l’annonce" : "Enregistrer")}
            </Button>
        </form>
    );
}
