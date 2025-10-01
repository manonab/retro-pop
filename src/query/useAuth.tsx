import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const login = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const signup = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data: authData, error: authError } = await supabase.auth.signUp({ email, password });
            if (authError) throw authError;

            const userId = authData.user?.id;
            if (!userId) throw new Error("ID utilisateur non retourné après l'inscription.");

            const { error: profileError } = await supabase
                .from('profiles')
                .insert({
                    user_id: userId,
                    display_name: email.split('@')[0], // Utilise la partie avant le @ comme nom d'affichage par défaut
                    avatar_url: null,
                    is_pro: false,
                });

            if (profileError) throw profileError;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        },
    });

    return { login, signup, logout };
};
