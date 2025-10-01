import { User } from "@/types/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

const ProfileTabs = ({ user }: { user: User }) => {
    return (
        <Tabs defaultValue="infos">
            <TabsList className="mb-6">
                <TabsTrigger value="infos">Informations</TabsTrigger>
                <TabsTrigger value="achats">Mes achats</TabsTrigger>
                <TabsTrigger value="ventes">Mes ventes</TabsTrigger>
            </TabsList>
            <TabsContent value="infos">
                <div className="space-y-4">
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Compte créé le :</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Non spécifié"}</p>
                    {user.isPro && <p><strong>Type de compte :</strong> Professionnel</p>}
                </div>
            </TabsContent>
            <TabsContent value="achats">
                <p>Contenu des achats...</p>
            </TabsContent>
            <TabsContent value="ventes">
                <p>Contenu des ventes...</p>
            </TabsContent>
        </Tabs>
    );
};

export default ProfileTabs;
