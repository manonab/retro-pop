"use client";

import { Camera, Package, Settings, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import type { User } from "../Account";

const ProfilHeader = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
    return (
        <div className="mb-8">
            <Card className="shadow-card">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
                                {user.avatar ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                                ) : (
                                    <UserIcon className="w-12 h-12 text-primary-foreground" />
                                )}
                            </div>
                            <Button variant="outline" size="sm" className="absolute -bottom-2 -right-2">
                                <Camera className="w-3 h-3" />
                            </Button>
                        </div>

                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-foreground mb-1">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-muted-foreground mb-3">Membre depuis {user.joinedDate}</p>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center space-x-1"><Package className="w-4 h-4 text-primary" /><span>{user.totalPurchases} achats</span></div>
                                <div className="flex items-center space-x-1"><Package className="w-4 h-4 text-accent" /><span>{user.totalSales} ventes</span></div>
                                <div className="flex items-center space-x-1"><span>⭐ {user.rating}</span><span className="text-muted-foreground">({user.reviewsCount} avis)</span></div>
                            </div>
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="outline"><Settings className="w-4 h-4 mr-2" />Paramètres</Button>
                            <Button variant="outline" onClick={onLogout}>Déconnexion</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
export default ProfilHeader