"use client";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const RegisterForm = ({ onSuccess, onSwitch }: { onSuccess: () => void; onSwitch: () => void }) => {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserIcon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Rejoignez RetroMarket</h1>
                        <p className="text-muted-foreground">Créez votre compte pour commencer à collectionner</p>
                    </div>

                    <Card className="shadow-card">
                        <CardContent className="p-6">
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="firstName">Prénom</Label>
                                        <Input id="firstName" placeholder="Jean" />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastName">Nom</Label>
                                        <Input id="lastName" placeholder="Dupont" />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="jean.dupont@example.com" />
                                </div>
                                <div>
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Input id="password" type="password" placeholder="••••••••" />
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                                </div>
                                <Button variant="hero" className="w-full" type="submit">Créer mon compte</Button>
                                <p className="text-sm text-center text-muted-foreground">
                                    Déjà membre ?{" "}
                                    <button type="button" onClick={onSwitch} className="text-primary hover:underline">Se connecter</button>
                                </p>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;