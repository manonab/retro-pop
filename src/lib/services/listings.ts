import { supabase } from "@/lib/supabaseClient";

export async function fetchListings() {
    const { data, error } = await supabase
        .from("listings")
        .select("*, listing_images(url,position)")
        .eq("status","active")
        .order("created_at",{ ascending:false });
    if (error) throw error;
    return data;
}

export async function createListing(payload: any) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Non authentifié");
    const { data, error } = await supabase
        .from("listings")
        .insert({ seller_id: user.id, ...payload })
        .select()
        .single();
    if (error) throw error;
    return data;
}
