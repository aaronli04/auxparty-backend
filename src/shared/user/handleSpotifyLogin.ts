import supabase from "../../supabase/client";
import { StringKeyMap, User } from "../../types";

export async function handleSpotifyLogin(payload: StringKeyMap): Promise<User | null> {
    const { data, error } = await supabase
        .from('users')
        .upsert(payload, {
            onConflict: 'auxpartyId'
        })
        .select()

    if (error || data.length === 0) { return null }
    return data[0];
}