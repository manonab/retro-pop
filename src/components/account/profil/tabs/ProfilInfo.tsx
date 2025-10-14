"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { User } from '@/types/user';

const ProfileInfo = ({ user }: { user: User }) => {
    return (
        <Card>
            <CardHeader><CardTitle>Informations personnelles</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label htmlFor="profileFirstName">Prénom</Label><Input id="profileFirstName" defaultValue={user.firstName} /></div>
                    <div><Label htmlFor="profileLastName">Nom</Label><Input id="profileLastName" defaultValue={user.lastName} /></div>
                </div>
                <div><Label htmlFor="profileEmail">Email</Label><Input id="profileEmail" type="email" defaultValue={user.email} /></div>
                <div><Label htmlFor="profilePhone">Téléphone</Label><Input id="profilePhone" defaultValue={user.phone} /></div>
                <div><Label htmlFor="profileAddress">Adresse</Label><Textarea id="profileAddress" defaultValue={user.address} /></div>
                <div><Label htmlFor="profileBio">Bio</Label><Textarea id="profileBio" placeholder="Parlez-nous de votre passion…" /></div>
                <Button variant="hero">Sauvegarder les modifications</Button>
            </CardContent>
        </Card>
    );
}
export default ProfileInfo;