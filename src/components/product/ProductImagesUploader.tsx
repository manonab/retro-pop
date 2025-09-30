"use client";
import { useState } from "react";
import { uploadProductImage } from "@/lib/services/images";

export default function ProductImagesUploader({ productId }: { productId: string }) {
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState<string[]>([]);

    async function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.length) return;
        setLoading(true);
        try {
            const uploads = Array.from(e.target.files).map(f => uploadProductImage(productId, f));
            const results = await Promise.all(uploads);
            setUrls(prev => [...prev, ...results]);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <input type="file" multiple accept="image/*" onChange={onSelect} />
            {loading && <p>Upload…</p>}
            <div className="grid grid-cols-3 gap-2 mt-3">
                {urls.map(u => (
                    <img key={u} src={u} alt="preview" className="rounded" />
                ))}
            </div>
        </div>
    );
}
