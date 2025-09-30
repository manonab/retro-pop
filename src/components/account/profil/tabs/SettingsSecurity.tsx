"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const SettingsSecurity = ()=> {
    return (
        <Card>
            <CardHeader><CardTitle>Sécurité</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">Changer le mot de passe</Button>
                <Button variant="outline" className="w-full">Activer l&apos;authentification à deux facteurs</Button>
            </CardContent>
        </Card>
    );
}

export default SettingsSecurity;