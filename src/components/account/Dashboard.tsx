"use client";

import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import { useState } from "react";
import { useAuth } from "@/mutations/auth/useAuth";
import { useUser } from "@/queries/useProfile";
import ProfileHeader from "@/components/account/profil/ProfileHeader";
import ProfileTabs from "@/components/account/profil/ProfileTabs";

const Dashboard = () => {
    const { user, isLoading } = useUser();
    const { logout } = useAuth();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    if (isLoading) {
        return (
            <div className="min-h-screen grid place-items-center bg-retro">
                <div className="w-full max-w-2xl mx-auto px-6">
                    <div className="h-10 w-48 rounded-full bg-white/70 border border-border animate-pulse mx-auto mb-6" />
                    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur p-6 bevel-card">
                        <div className="h-5 w-2/3 bg-muted rounded mb-3 animate-pulse" />
                        <div className="h-4 w-1/2 bg-muted rounded mb-2 animate-pulse" />
                        <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return isRegistering ? (
            <div className="min-h-screen grid place-items-center bg-retro px-4 py-10">
                <div className="auth-card w-full max-w-lg md:max-w-2xl rounded-2xl border border-border bg-card/85 backdrop-blur p-8 bevel-card">
                    <h1 className="title-vhs mb-6">Créer un compte</h1>
                    <RegisterForm onSwitch={() => setIsRegistering(false)} onSuccess={() => {}} />
                </div>
            </div>
        ) : (
            <div className="min-h-screen grid place-items-center bg-retro px-4 py-10">
                <div className="auth-card w-full max-w-lg md:max-w-2xl rounded-2xl border border-border bg-card/85 backdrop-blur p-8 bevel-card">
                    <h1 className="title-vhs mb-6">Se connecter</h1>
                    <LoginForm onSwitch={() => setIsRegistering(true)} onSuccess={() => {}} />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-retro relative">
            <div
                className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 -rotate-2 -z-10 h-14 w-[120%] opacity-70"
                style={{ background: "var(--retro-gradient)" }}
            />

            <div className="container mx-auto px-4 py-8">
                <section className="label-paper rounded-2xl p-6 md:p-8 border border-border bevel-card">
                    <div className="mb-6 text-center">
                        <h1 className="title-vhs">Mon espace</h1>
                        <div className="divider-retro mx-auto mt-3" />
                    </div>

                    <ProfileHeader user={user} onLogout={() => logout.mutate()} />
                </section>

                <section className="mt-8 rounded-2xl border border-border bg-card/85 backdrop-blur p-4 md:p-6 bevel-card">
                    <ProfileTabs user={user} />
                </section>
            </div>

            <div
                className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 rotate-1 -z-10 h-14 w-[115%] opacity-70"
                style={{ background: "var(--retro-gradient-alt)" }}
            />
        </div>
    );
};

export default Dashboard;
