"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {useCreateProduct} from "@/mutations/products/useProduct";
import {Textarea} from "@/components/ui/TextArea";

export default function ProductCreateForm() {
    const createProduct = useCreateProduct();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [currency, setCurrency] = useState("EUR");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState<FileList | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createProduct.mutateAsync({
            title,
            description,
            price: Number(price),
            currency,
            images: files ? Array.from(files) : []
        });
    };

    return (
        <form className="space-y-4" onSubmit={onSubmit}>
            <Input placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <div className="flex gap-2">
                <Input type="number" step="0.01" placeholder="Prix" value={price} onChange={e => setPrice(Number(e.target.value))} />
                <Input placeholder="Devise" value={currency} onChange={e => setCurrency(e.target.value)} />
            </div>
            <Input type="file" multiple onChange={e => setFiles(e.target.files)} />
            <Button type="submit" disabled={createProduct.isPending}>
                {createProduct.isPending ? "Création…" : "Créer l'annonce"}
            </Button>
        </form>
    );
}
