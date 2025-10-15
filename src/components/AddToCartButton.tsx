"use client";

import { useCart as useCartStore } from "@/stores/useCart";
import {Button} from "@/components/ui/Button";

export function AddToCartButton({ productId, className }: { productId: string; className?: string }) {
    const add = useCartStore((s) => s.add);
    return (
        <Button
            onClick={() => add(productId)}
            className={className ?? "sticker sticker-vhs sticker-gloss px-6 h-12 font-semibold hover:scale-[1.02] transition"}
        >

            Ajouter au panier
        </Button>
    );
}
