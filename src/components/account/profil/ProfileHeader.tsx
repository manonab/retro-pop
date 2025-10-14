import { User } from "@/types/user";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const ProfileHeader = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
    return (
        <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
                {user.avatarUrl ? (
                    <Image src={user.avatarUrl} width={200} height={200} alt="Avatar" className="w-16 h-16 rounded-full" />
                ) : (
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {user.displayName?.[0] || user.email[0]}
                    </div>
                )}
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        {user.displayName || user.email}
                    </h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    {user.isPro && <span className="text-sm text-green-500">Compte Pro</span>}
                </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
                Déconnexion
            </Button>
            <Button variant="outline" onClick={onLogout}>
                Déconnexion
            </Button>
        </div>
    );
};

export default ProfileHeader;
