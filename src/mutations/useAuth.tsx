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
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
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
