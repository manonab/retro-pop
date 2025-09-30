"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const SettingsNotifications = () => {
    return (
        <Card>
            <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Nouveaux messages</p>
                        <p className="text-sm text-muted-foreground">Recevoir les notifications par email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Alertes prix</p>
                        <p className="text-sm text-muted-foreground">Être averti des baisses de prix</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                </div>
            </CardContent>
        </Card>
    );
}
export default SettingsNotifications;