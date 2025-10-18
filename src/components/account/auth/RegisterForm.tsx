"use client";

import { useState } from "react";
import {
    User as UserIcon,
    Mail, Lock, Eye, EyeOff, Phone, MapPin, Building2, Hash,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useAuth } from "@/mutations/auth/useAuth";

const RegisterForm = ({
                          onSuccess,
                          onSwitch,
                      }: {
    onSuccess: () => void;
    onSwitch: () => void;
}) => {
    const [formData, setFormData] = useState({
        email: "", password: "", firstName: "", lastName: "",
        phone: "", address: "", city: "", postalCode: "",
    });
    const [showPwd, setShowPwd] = useState(false);
    const { signup } = useAuth();

    const canSubmit =
        formData.email.trim() !== "" &&
        formData.password.trim().length >= 6 &&
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "";

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setFormData((p) => ({ ...p, [id]: value }));
    }

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault();
        if (!canSubmit) return;
        try {
            await signup.mutateAsync({
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
            });
            onSuccess();
        } catch {
            /* handled by signup.error */
        }
    }

    return (
        <div className="min-h-screen bg-retro relative">
            {/* Ruban VHS top */}
            <div
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-14 w-[120%] opacity-70"
                style={{ background: "var(--retro-gradient)" }}
            />

            <div className="container mx-auto px-4 py-12">
                {/* Header compact */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl grid place-items-center sticker bevel-card">
                        <UserIcon className="w-8 h-8 text-foreground" />
                    </div>
                    <h1 className="title-vhs">Créer un compte</h1>
                    <div className="divider-retro mx-auto mt-3" />
                    <p className="mt-2 text-sm text-muted-foreground">Rejoignez la communauté Retro Pop</p>
                </div>

                {/* Card formulaire */}
                <div className="max-w-2xl  mx-auto">
                    <Card className="bevel-card">
                        <CardContent className="p-6">
                            <div className="label-paper vhs-notch rounded-xl p-5">
                                <form className="space-y-4" onSubmit={handleSignup} noValidate>
                                    {/* Identité */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="firstName">Prénom</Label>
                                            <Input
                                                id="firstName" type="text" placeholder="Jean"
                                                value={formData.firstName} onChange={handleChange}
                                                autoComplete="given-name" required
                                                aria-invalid={!!signup.error && !formData.firstName}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lastName">Nom</Label>
                                            <Input
                                                id="lastName" type="text" placeholder="Dupont"
                                                value={formData.lastName} onChange={handleChange}
                                                autoComplete="family-name" required
                                                aria-invalid={!!signup.error && !formData.lastName}
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative mt-1">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id="email" type="email" inputMode="email" autoComplete="email"
                                                placeholder="jean.dupont@example.com"
                                                value={formData.email} onChange={handleChange}
                                                className="pl-9" required
                                                aria-invalid={!!signup.error}
                                            />
                                        </div>
                                    </div>

                                    {/* Mot de passe */}
                                    <div>
                                        <Label htmlFor="password">Mot de passe</Label>
                                        <div className="relative mt-1">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id="password" type={showPwd ? "text" : "password"}
                                                autoComplete="new-password" placeholder="••••••••"
                                                value={formData.password} onChange={handleChange}
                                                className="pl-9 pr-10" required
                                                aria-invalid={!!signup.error}
                                            />
                                            <button
                                                type="button" onClick={() => setShowPwd((s) => !s)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-muted-foreground hover:text-foreground"
                                                aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                                aria-pressed={showPwd}
                                            >
                                                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">6+ caractères minimum.</p>
                                    </div>

                                    {/* Téléphone */}
                                    <div>
                                        <Label htmlFor="phone">Téléphone</Label>
                                        <div className="relative mt-1">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id="phone" type="tel" inputMode="tel" autoComplete="tel"
                                                placeholder="+33 6 12 34 56 78"
                                                value={formData.phone} onChange={handleChange} className="pl-9"
                                            />
                                        </div>
                                    </div>

                                    {/* Adresse */}
                                    <div>
                                        <Label htmlFor="address">Adresse</Label>
                                        <div className="relative mt-1">
                                            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                            <Input
                                                id="address" type="text" autoComplete="street-address"
                                                placeholder="123 Rue de la Paix"
                                                value={formData.address} onChange={handleChange} className="pl-9"
                                            />
                                        </div>
                                    </div>

                                    {/* Ville + CP */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="postalCode">Code postal</Label>
                                            <div className="relative mt-1">
                                                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    id="postalCode" type="text" autoComplete="postal-code"
                                                    placeholder="75001"
                                                    value={formData.postalCode} onChange={handleChange} className="pl-9"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="city">Ville</Label>
                                            <div className="relative mt-1">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                                                <Input
                                                    id="city" type="text" autoComplete="address-level2"
                                                    placeholder="Paris"
                                                    value={formData.city} onChange={handleChange} className="pl-9"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA simple cohérent DA */}
                                    <button
                                        type="submit"
                                        disabled={signup.isPending || !canSubmit}
                                        className="btn-sticker w-full disabled:opacity-60"
                                        aria-busy={signup.isPending}
                                    >
                                        {signup.isPending ? "Inscription en cours..." : "S'inscrire"}
                                    </button>

                                    {/* Switch vers login */}
                                    <p className="text-sm text-center text-muted-foreground">
                                        Déjà membre ?{" "}
                                        <Button
                                            type="button"
                                            onClick={onSwitch}
                                            className="text-primary hover:underline bg-transparent p-0 h-auto"
                                            variant="link"
                                        >
                                            Se connecter
                                        </Button>
                                    </p>

                                    {/* Erreur */}
                                    {signup.error && (
                                        <p className="text-sm text-destructive text-center">
                                            {signup.error.message}
                                        </p>
                                    )}
                                </form>
                            </div>

                            {/* Trust row */}
                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm text-muted-foreground">
                                <div className="bg-card border border-border rounded-lg p-3">
                                    <div className="font-medium text-foreground">Données privées</div>
                                    <div>Aucun spam</div>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-3">
                                    <div className="font-medium text-foreground">Support réactif</div>
                                    <div>Sous 24h ouvrées</div>
                                </div>
                                <div className="bg-card border border-border rounded-lg p-3">
                                    <div className="font-medium text-foreground">Marketplace vérifiée</div>
                                    <div>Vendeurs contrôlés</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Ruban VHS bas */}
            <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-14 w-[115%] opacity-70"
                style={{ background: "var(--retro-gradient-alt)" }}
            />
        </div>
    );
};

export default RegisterForm;
