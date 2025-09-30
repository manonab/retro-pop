"use client";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const LoginForm = ({ onSuccess, onSwitch }: { onSuccess: () => void; onSwitch: () => void })=> {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserIcon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenue</h1>
                        <p className="text-muted-foreground">Connectez-vous à votre compte</p>
                    </div>

                    <Card className="shadow-card">
                        <CardContent className="p-6">
                            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
                                <div>
                                    <Label htmlFor="loginEmail">Email</Label>
                                    <Input id="loginEmail" type="email" placeholder="jean.dupont@example.com" />
                                </div>
                                <div>
                                    <Label htmlFor="loginPassword">Mot de passe</Label>
                                    <Input id="loginPassword" type="password" placeholder="••••••••" />
                                </div>
                                <div className="text-right">
                                    <button type="button" className="text-sm text-primary hover:underline">Mot de passe oublié ?</button>
                                </div>
                                <Button variant="hero" className="w-full" type="submit">Se connecter</Button>
                                <p className="text-sm text-center text-muted-foreground">
                                    Nouveau membre ?{" "}
                                    <button type="button" onClick={onSwitch} className="text-primary hover:underline">Créer un compte</button>
                                </p>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-6">
                        <div className="text-center text-muted-foreground mb-4">
                            <span className="px-4 bg-background">ou</span>
                        </div>
                        <Button variant="outline" className="w-full">Continuer avec Google</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginForm;