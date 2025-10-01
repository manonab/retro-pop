"use client";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { useAuth } from "@/mutations/useAuth";

const RegisterForm = ({ onSuccess, onSwitch }: { onSuccess: () => void; onSwitch: () => void }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { signup } = useAuth();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup.mutateAsync({ email, password });
            onSuccess(); // Redirige vers le dashboard après une inscription réussie
        } catch (error) {
            console.error("Erreur d'inscription:", error);
        }
    };

    const handleSwitchToLogin = () => {
        onSwitch(); // Bascule vers le formulaire de connexion
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-md mx-auto">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserIcon className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">Créer un compte</h1>
                        <p className="text-muted-foreground">Inscrivez-vous pour accéder à votre espace</p>
                    </div>
                    <Card className="shadow-card">
                        <CardContent className="p-6">
                            <form className="space-y-4" onSubmit={handleSignup}>
                                <div>
                                    <Label htmlFor="registerEmail">Email</Label>
                                    <Input
                                        id="registerEmail"
                                        type="email"
                                        placeholder="jean.dupont@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="registerPassword">Mot de passe</Label>
                                    <Input
                                        id="registerPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <Button variant="hero" className="w-full" type="submit" disabled={signup.isPending}>
                                    {signup.isPending ? "Inscription en cours..." : "S'inscrire"}
                                </Button>
                                <p className="text-sm text-center text-muted-foreground">
                                    Déjà membre ?{" "}
                                    <Button
                                        type="button"
                                        onClick={handleSwitchToLogin}
                                        className="text-primary hover:underline bg-transparent p-0 h-auto"
                                        variant="link"
                                    >
                                        Se connecter
                                    </Button>
                                </p>
                                {signup.error && (
                                    <p className="text-sm text-red-500 text-center">{signup.error.message}</p>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
