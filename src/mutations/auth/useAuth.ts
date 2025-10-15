import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { ToastType, useToast } from "@/components/ui/Toast";
import { useCart } from "@/stores/useCart"; // ✅

export const useAuth = () => {
    const qc = useQueryClient();
    const { openToast } = useToast();

    const login = useMutation({
        mutationFn: async ({ email, password }: { email: string; password: string }) => {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return data;
        },
        onSuccess: async () => {
            // ✅ Fusionner local -> serveur et vider le local après
            const cart = useCart.getState();
            try {
                await cart.syncToServer({ mergeOnSync: true, clearLocalAfterSync: true });
            } catch (e) {
                console.error("cart sync on login failed:", e);
            }

            qc.invalidateQueries({ queryKey: ["user"] });
            openToast({ type: ToastType.SUCCESS, description: "Connexion réussie. Bienvenue 👋" });
        },
        onError: (err) => {
            openToast({ type: ToastType.ERROR, description: `Échec de la connexion : ${err}` });
        },
    });

    const signup = useMutation({
        mutationFn: async (formData: {
            email: string; password: string;
            firstName: string; lastName: string; phone: string;
            address: string; city: string; postalCode: string;
        }) => {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        postal_code: formData.postalCode,
                        display_name: `${formData.firstName} ${formData.lastName}`,
                    },
                },
            });
            if (authError) throw authError;

            const userId = authData.user?.id;
            if (userId && authData.session) {
                const { error: updateError } = await supabase
                    .from('profiles')
                    .update({
                        display_name: `${formData.firstName} ${formData.lastName}`,
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        phone: formData.phone,
                        address: formData.address,
                        city: formData.city,
                        postal_code: formData.postalCode,
                        avatar_url: null,
                        is_pro: false,
                    })
                    .eq('user_id', userId);
                if (updateError) throw updateError;
            }
        },
        onSuccess: async () => {
            // (optionnel) même logique que login si tu connectes direct après signup
            const cart = useCart.getState();
            try {
                await cart.syncToServer({ mergeOnSync: true, clearLocalAfterSync: true });
            } catch (e) {
                console.error("cart sync on signup failed:", e);
            }

            qc.invalidateQueries({ queryKey: ["user"] });
            openToast({ type: ToastType.SUCCESS, description: "Compte créé ✅. Bienvenue !" });
        },
        onError: (err) => {
            openToast({ type: ToastType.ERROR, description: `Échec de l’inscription : ${err}` });
        },
    });

    const logout = useMutation({
        mutationFn: async () => {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        },
        onSuccess: () => {
            // ✅ Vider totalement le panier côté client
            try {
                const cart = useCart.getState();
                cart.clear();                    // vide le store Zustand
                localStorage.removeItem("cart_v1"); // supprime la persistance
            } catch (e) {
                console.error("cart clear on logout failed:", e);
            }

            qc.setQueryData(["user"], null);
            openToast({ type: ToastType.SUCCESS, description: "Déconnexion effectuée." });
        },
        onError: (err) => {
            openToast({ type: ToastType.ERROR, description: `Impossible de se déconnecter : ${err}` });
        },
    });

    return { login, signup, logout };
};
