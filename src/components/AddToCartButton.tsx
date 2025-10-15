"use client";

import { useCart as useCartStore } from "@/stores/useCart";

export function AddToCartButton({ productId, className }: { productId: string; className?: string }) {
    const add = useCartStore((s) => s.add);
    return (
        <button
            onClick={() => add(productId, 1)}
            className={className ?? "hover:cursor-pointer inline-flex items-center rounded-xl bg-black px-4 py-2 text-white hover:opacity-90"}
        >
            Ajouter au panier
        </button>
    );
}
