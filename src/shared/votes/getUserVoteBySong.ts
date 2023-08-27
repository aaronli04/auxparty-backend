import supabase from "../../supabase/client";
import { StringKeyMap } from "../../types";

export async function getUserVoteBySong(payload: StringKeyMap): Promise<number | null> {
    const { data, error } = await supabase
        .from('votes')
        .select()
        .match({ auxpartyId: payload.auxpartyId, userId: payload.userId})
    
    if (!data || data.length == 0) { return 0 }
    return data[0].voteValue
}