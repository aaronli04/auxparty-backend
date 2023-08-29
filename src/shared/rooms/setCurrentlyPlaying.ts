import supabase from "../../supabase/client";
import { StringKeyMap, Room } from "../../types";

export async function setCurrentlyPlaying(payload: StringKeyMap): Promise<Room | null> {
    const { data, error } = await supabase
        .from('rooms')
        .update({ currentlyPlaying: payload.currentlyPlaying})
        .eq('auxpartyId', payload.auxpartyId)
        .select()
    
    if (error || data.length === 0) { return null }
    return data[0];
}