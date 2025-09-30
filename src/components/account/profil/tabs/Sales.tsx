"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const Sales = ()=> {
    const sales = [ { title:"Console Game Boy Color", date:"10 janvier 2024", price:"89,00 €" }, { title:"Zelda OOT", date:"05 janvier 2024", price:"129,00 €" } ];
    return (
        <Card>
            <CardHeader><CardTitle>Mes ventes</CardTitle></CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sales.map((s, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                            <div>
                                <p className="font-semibold">{s.title}</p>
                                <p className="text-sm text-muted-foreground">Vendu le {s.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold">{s.price}</p>
                                <Badge className="bg-green-100 text-green-700">Complétée</Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
export default Sales;