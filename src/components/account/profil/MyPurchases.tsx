"use client";
import { Card, CardContent } from "@/components/ui/Card";

export default function MyPurchases() {
    return (
        <Card>
            <CardContent>
                <p className="text-muted-foreground">
                    Pas de système d&aposachat en ligne pour le moment. Vous pouvez contacter le vendeur depuis la fiche produit.
                </p>
            </CardContent>
        </Card>
    );
}
