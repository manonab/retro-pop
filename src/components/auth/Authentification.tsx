import { useState, FormEvent } from 'react';
import {supabase} from "@/lib/supabaseClient";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function Auth() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) alert(error.message);
        setLoading(false);
    };

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) alert(error.message);
        setLoading(false);
    };

    return (
        <form>
            <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} disabled={loading}>
                Se connecter
            </Button>
            <Button onClick={handleSignup} disabled={loading}>
                S'inscrire
            </Button>
        </form>
    );
}
