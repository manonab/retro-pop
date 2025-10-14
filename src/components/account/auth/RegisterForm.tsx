"use client";
import { User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { useAuth } from "@/mutations/auth/useAuth";

const RegisterForm = ({ onSuccess, onSwitch }: { onSuccess: () => void; onSwitch: () => void }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const { signup } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
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
        } catch (error) {
            console.error("Erreur d'inscription:", error);
        }
    };

    const handleSwitchToLogin = () => {
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
                        <h1 className="text-3xl font-bold text-foreground mb-2">Créer un compte</h1>
                        <p className="text-muted-foreground">Inscrivez-vous pour accéder à votre espace</p>
                    </div>
                    <Card className="shadow-card">
                        <CardContent className="p-6">
                            <form className="space-y-4" onSubmit={handleSignup}>
                                {/* Email */}
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="jean.dupont@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="password">Mot de passe</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Jean"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Nom de famille */}
                                <div>
                                    <Label htmlFor="lastName">Nom de famille</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Dupont"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Téléphone */}
                                <div>
                                    <Label htmlFor="phone">Téléphone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+33 6 12 34 56 78"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Adresse */}
                                <div>
                                    <Label htmlFor="address">Adresse</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        placeholder="123 Rue de la Paix"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Ville et Code postal */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="postalCode">Code postal</Label>
                                        <Input
                                            id="postalCode"
                                            type="text"
                                            placeholder="75001"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="city">Ville</Label>
                                        <Input
                                            id="city"
                                            type="text"
                                            placeholder="Paris"
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Bouton d'inscription */}
                                <Button variant="hero" className="w-full" type="submit" disabled={signup.isPending}>
                                    {signup.isPending ? "Inscription en cours..." : "S'inscrire"}
                                </Button>

                                {/* Lien vers la connexion */}
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

                                {/* Affichage des erreurs */}
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
