"use client";

import { useState } from "react";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ProfileHeader from "./profil/ProfilHeader";
import ProfileTabs from "./profil/ProfilTabs";

export type User = {
    firstName: string; lastName: string; email: string; phone: string;
    address: string; joinedDate: string; totalPurchases: number; totalSales: number;
    rating: number; reviewsCount: number; avatar: string | null;
};

const mockUser: User = {
    firstName: "Richard", lastName: "Dupont", email: "jean.dupont@example.com",
    phone: "+33 6 12 34 56 78", address: "123 Rue de la Paix, 75001 Paris",
    joinedDate: "Janvier 2023", totalPurchases: 12, totalSales: 8, rating: 4.8,
    reviewsCount: 23, avatar: null,
};

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    if (!isLoggedIn) {
        return isRegistering ? (
            <RegisterForm onSwitch={() => setIsRegistering(false)} onSuccess={() => setIsLoggedIn(true)} />
        ) : (
            <LoginForm onSwitch={() => setIsRegistering(true)} onSuccess={() => setIsLoggedIn(true)} />
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <ProfileHeader user={mockUser} onLogout={() => setIsLoggedIn(false)} />
                <ProfileTabs user={mockUser} />
            </div>
        </div>
    );
}
export default Account;