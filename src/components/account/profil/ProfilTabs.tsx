"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import type { User } from "../Account";
import ProfileInfo from "./tabs/ProfilInfo";
import Orders from "./tabs/Orders";
import Sales from "./tabs/Sales";
import SettingsNotifications from "./tabs/SettingsNotifications";
import SettingsSecurity from "./tabs/SettingsSecurity";

export default function ProfileTabs({ user }: { user: User }) {
    return (
        <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
                <TabsTrigger value="sales">Mes ventes</TabsTrigger>
                <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>

            <TabsContent value="profile"><ProfileInfo user={user} /></TabsContent>
            <TabsContent value="orders"><Orders /></TabsContent>
            <TabsContent value="sales"><Sales /></TabsContent>
            <TabsContent value="settings">
                <div className="space-y-6">
                    <SettingsNotifications />
                    <SettingsSecurity />
                </div>
            </TabsContent>
        </Tabs>
    );
}
