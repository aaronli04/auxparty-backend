import supabase from "../../supabase/client";
import { StringKeyMap, Room } from "../../types";

export async function updateActiveStatus(payload: StringKeyMap): Promise<Room | null> {
    const { data, error } = await supabase
        .from('rooms')
        .update({ active: payload.active})
        .eq('auxpartyId', payload.auxpartyId)
        .select()
    
    if (error || data.length === 0) { return null }
    return data[0];
}