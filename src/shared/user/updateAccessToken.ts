import supabase from "../../supabase/client";
import { StringKeyMap, User } from "../../types";

export async function updateAccessToken(payload: StringKeyMap): Promise<User | null> {
    const { data, error } = await supabase
        .from('users')
        .update({ accessToken: payload.accessToken})
        .eq('auxpartyId', payload.auxpartyId)
        .select()
    
    if (error || data.length === 0) { return null }
    return data[0];
}