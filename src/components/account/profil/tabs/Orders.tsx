"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const Orders = () => {
    const orders = [1,2,3];
    return (
        <Card>
            <CardHeader><CardTitle>Mes commandes</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {orders.map((o) => (
                        <div key={o} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div>
                                <p className="font-semibold">Commande #CMD-2024-{o.toString().padStart(3,"0")}</p>
                                <p className="text-sm text-muted-foreground">15 janvier 2024</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">149,00 €</p>
                                <Badge variant="outline">Livrée</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
export default Orders;