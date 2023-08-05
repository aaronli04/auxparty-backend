import supabase from "../../supabase/client";
import { Room, StringKeyMap } from "../../types";

export async function createRoom(payload: StringKeyMap): Promise<Room | null> {
    const { auxpartyId, roomName, roomPassword } = payload
    const created_at = new Date();
    const modified_at = new Date();

    // Check if active room exists with given auxpartyId
    const { data: existingRoom, error: fetchError } = await supabase
        .from('rooms')
        .select()
        .eq('auxpartyId', auxpartyId)
        .limit(1);

    if (fetchError || existingRoom.length > 0) {
        return null;
    }

    // Create room
    const { data, error } = await supabase
        .from('rooms')
        .insert({ auxpartyId, name: roomName, password: roomPassword, created_at, modified_at })
        .select()

    if (error || data.length === 0) { return null }
    return data[0];
}
