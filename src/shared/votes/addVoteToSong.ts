import supabase from "../../supabase/client";
import { StringKeyMap, Vote } from "../../types";

export async function addVoteToSong(payload: StringKeyMap): Promise<Vote | null> {
    const { data, error } = await supabase
        .from('votes')
        .upsert(payload, {
            onConflict: 'auxpartyId, userId'
        })
        .select()

    if (error || data.length === 0) { return null }
    return data[0];
}