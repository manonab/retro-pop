"use client";

import { FormEvent, useState } from "react";
import { User as UserIcon, Mail, Lock, Eye, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuth } from "@/mutations/auth/useAuth";

const LoginForm = ({ onSuccess, onSwitch }: { onSuccess: () => void; onSwitch: () => void }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPwd, setShowPwd] = useState<boolean>(false);
    const { login } = useAuth();

    async function handleLogin(e: FormEvent) {
        e.preventDefault();
        if (!email || !password) return;
        try {
            await login.mutateAsync({ email, password });
            onSuccess();
        } catch {
            // handled by login.error UI
        }
    }

    return (
        <div className="min-h-screen bg-retro relative">
            {/* Ruban dégradé haut (vibe VHS) */}
            <div
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-14 w-[120%] opacity-70"
                style={{ background: "var(--retro-gradient)" }}
            />

            <div className="container mx-auto px-4 py-12">
                {/* Header compact et lisible */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl grid place-items-center sticker bevel-card">
                        <UserIcon className="w-8 h-8 text-foreground" />
                    </div>
                    <h1 className="title-vhs">Connexion</h1>
                    <div className="divider-retro mx-auto mt-3" />
                    <p className="mt-2 text-sm text-muted-foreground">Accédez à votre compte Retro Pop</p>
                </div>

                <div className="max-w-md mx-auto">
                    <Card className="bevel-card">
                        <CardContent className="p-6">
                            {/* Formulaire dans une étiquette papier */}
                            <div className="label-paper vhs-notch rounded-xl p-5">
                                <form className="space-y-4" onSubmit={handleLogin} noValidate>
                                    {/* Email */}
                                    <div>
                                        <Label htmlFor="loginEmail">Email</Label>
                                        <div className="relative mt-1">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id="loginEmail"
                                                type="email"
                                                inputMode="email"
                                                autoComplete="email"
                                                placeholder="jean.dupont@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-9"
                                                required
                                                aria-invalid={!!login.error}
                                            />
                                        </div>
                                    </div>

                                    {/* Mot de passe */}
                                    <div>
                                        <Label htmlFor="loginPassword">Mot de passe</Label>
                                        <div className="relative mt-1">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id="loginPassword"
                                                type={showPwd ? "text" : "password"}
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-9 pr-10"
                                                required
                                                aria-invalid={!!login.error}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPwd((s) => !s)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
                                                aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                                aria-pressed={showPwd}
                                            >
                                                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Options + lien reset */}
                                    <div className="flex items-center justify-between">
                                        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                                            <input type="checkbox" className="accent-primary" /> Se souvenir de moi
                                        </label>
                                        <Button
                                            type="button"
                                            className="text-sm text-primary hover:underline bg-transparent p-0 h-auto"
                                            onClick={() => alert("Réinitialisation à implémenter")}
                                        >
                                            Mot de passe oublié ?
                                        </Button>
                                    </div>

                                    {/* CTA : simple, cohérent avec ta DA */}
                                    <button
                                        type="submit"
                                        disabled={login.isPending || !email || !password}
                                        className="btn-sticker w-full disabled:opacity-60"
                                        aria-busy={login.isPending}
                                    >
                                        {login.isPending ? "Connexion en cours..." : "Se connecter"}
                                    </button>

                                    {/* Switch register */}
                                    <p className="text-sm text-center text-muted-foreground">
                                        Nouveau membre ?{" "}
                                        <Button
                                            type="button"
                                            onClick={onSwitch}
                                            className="text-primary hover:underline bg-transparent p-0 h-auto"
                                            variant="link"
                                        >
                                            Créer un compte
                                        </Button>
                                    </p>

                                    {/* Erreur */}
                                    {login.error && (
                                        <p className="text-sm text-destructive text-center">
                                            {login.error.message}
                                        </p>
                                    )}
                                </form>
                            </div>

                            {/* Trust row */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm text-muted-foreground">
                                <div className="bg-card border border-border rounded-lg p-3">
                                    <div className="font-medium text-foreground">Paiements sécurisés</div>
                                    <div>CB, Visa, Mastercard</div>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-3">
                                    <div className="font-medium text-foreground">Support rapide</div>
                                    <div>Sous 24h ouvrées</div>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-3">
                                    <div className="font-medium text-foreground flex items-center justify-center gap-1">
                                        Qualité <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                    </div>
                                    <div>Marketplace vérifiée</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Ruban dégradé bas */}
            <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-14 w-[115%] opacity-70"
                style={{ background: "var(--retro-gradient-alt)" }}
            />
        </div>
    );
};

export default LoginForm;
