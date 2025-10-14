"use client";
import { Card, CardContent } from "@/components/ui/Card";

export default function MyPurchases({ userId }: { userId: string }) {
    return (
        <Card>
            <CardContent>
                <p className="text-muted-foreground">
                    Pas de système d’achat en ligne pour le moment. Vous pouvez contacter le vendeur depuis la fiche produit.
                </p>
            </CardContent>
        </Card>
    );
}
