import supabase from "../../supabase/client";
import { StringKeyMap } from "../../types";

export async function getVotesBySong(payload: StringKeyMap): Promise<number | null> {
    const { data, error } = await supabase
        .from('votes')
        .select()
    
    if (!data || data.length == 0) { return 0 }
    let votes = 0
    data.forEach((vote) => {
        if (vote.auxpartyId === payload.auxpartyId) {
            votes += vote.voteValue
        }
    })
    return votes
}