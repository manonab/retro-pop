import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { User } from '@/types/user';

export const useUser = () => {
    const { data: user, isLoading } = useQuery<User | null, Error>({
        queryKey: ['user'],
        queryFn: async () => {
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
            if (authError || !authUser) return null;

            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', authUser.id)
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
                console.error("Erreur lors de la récupération du profil:", profileError);
                return null;
            }

            return {
                id: authUser.id,
                email: authUser.email || '',
                displayName: profile?.display_name || null,
                avatarUrl: profile?.avatar_url || null,
                isPro: profile?.is_pro || null,
                createdAt: profile?.created_at || null,
            } as User;
        },
    });

    return { user, isLoading };
};
