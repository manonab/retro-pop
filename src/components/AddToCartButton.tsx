"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart as useCartStore } from "@/stores/useCart";
import { Button } from "@/components/ui/Button";

export function AddToCartButton({
                                    productId,
                                    className,
                                }: {
    productId: string;
    className?: string;
}) {
    const add = useCartStore((s) => s.add);
    const [added, setAdded] = useState(false);

    async function onAdd() {
        add(productId);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    }

    return (
        <>
            <Button
                onClick={onAdd}
                aria-live="polite"
                className={[
                    // style neutre + accent au hover/focus
                    "btn-cart-soft h-10 md:h-11 px-5 md:px-6",
                    added ? "is-added" : "",
                    className ?? "",
                ].join(" ")}
            >
                {added ? (
                    <>
                        <Check className="w-4 h-4 mr-2" />
                        Ajouté
                    </>
                ) : (
                    <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Ajouter au panier
                    </>
                )}
            </Button>
            {/* Confirmation pour lecteurs d'écran */}
            <span className="sr-only" role="status" aria-live="polite">
        {added ? "Article ajouté au panier" : ""}
      </span>
        </>
    );
}
