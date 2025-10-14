import { User } from "@/types/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import MyListings from "@/components/account/profil/MyListings";

const ProfileTabs = ({ user }: { user: User }) => {
    return (
        <Tabs defaultValue="infos" className="w-full">
            <TabsList className="mb-6">
                <TabsTrigger value="infos">Informations</TabsTrigger>
                <TabsTrigger value="ventes">Mes annonces</TabsTrigger>
            </TabsList>

            <TabsContent value="infos">
                <div className="space-y-2">
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Compte créé le :</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</p>
                    {user.isPro && <p><strong>Type de compte :</strong> Professionnel</p>}
                </div>
            </TabsContent>

            <TabsContent value="ventes">
                <MyListings userId={user.id} />
            </TabsContent>
        </Tabs>
    );
};

export default ProfileTabs;
