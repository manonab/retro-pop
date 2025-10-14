"use client";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import {FormEvent, useState} from "react";
import { useAuth } from "@/mutations/auth/useAuth";

const LoginForm = ({ onSuccess, onSwitch }: { onSuccess: () => void; onSwitch: () => void }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login } = useAuth();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await login.mutateAsync({ email, password });
            onSuccess();
        } catch (error) {
            console.error("Erreur de connexion:", error);
        }
    };

    const handleSwitchToRegister = () => {
        onSwitch();
    };

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
                            <form className="space-y-4" onSubmit={handleLogin}>
                                <div>
                                    <Label htmlFor="loginEmail">Email</Label>
                                    <Input
                                        id="loginEmail"
                                        type="email"
                                        placeholder="jean.dupont@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="loginPassword">Mot de passe</Label>
                                    <Input
                                        id="loginPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="text-right">
                                    <Button
                                        type="button"
                                        className="text-sm text-primary hover:underline bg-transparent p-0 h-auto"
                                        onClick={() => alert("Fonctionnalité de réinitialisation de mot de passe à implémenter")}
                                    >
                                        Mot de passe oublié ?
                                    </Button>
                                </div>
                                <Button variant="hero" className="w-full" type="submit" disabled={login.isPending}>
                                    {login.isPending ? "Connexion en cours..." : "Se connecter"}
                                </Button>
                                <p className="text-sm text-center text-muted-foreground">
                                    Nouveau membre ?{" "}
                                    <Button
                                        type="button"
                                        onClick={handleSwitchToRegister}
                                        className="text-primary hover:underline bg-transparent p-0 h-auto"
                                        variant="link"
                                    >
                                        Créer un compte
                                    </Button>
                                </p>
                                {login.error && (
                                    <p className="text-sm text-red-500 text-center">{login.error.message}</p>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
