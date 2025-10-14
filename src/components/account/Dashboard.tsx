"use client";

import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import {useState} from "react";
import {useAuth} from "@/mutations/auth/useAuth";
import {useUser} from "@/queries/useProfile";
import ProfileHeader from "@/components/account/profil/ProfileHeader";
import ProfileTabs from "@/components/account/profil/ProfileTabs";

const Dashboard = () => {
    const { user, isLoading } = useUser();
    const { logout } = useAuth();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-foreground">Chargement...</p>
            </div>
        );
    }

    if (!user) {
        return isRegistering ? (
            <RegisterForm
                onSwitch={() => setIsRegistering(false)}
                onSuccess={() => {}}
            />
        ) : (
            <LoginForm
                onSwitch={() => setIsRegistering(true)}
                onSuccess={() => {}}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <ProfileHeader
                    user={user}
                    onLogout={() => logout.mutate()}
                />
                <ProfileTabs user={user} />
            </div>
        </div>
    );
};

export default Dashboard;