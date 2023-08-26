import supabase from "../../supabase/client";
import { StringKeyMap } from "../../types";

export async function addSongToSongs(roomId: string, song: StringKeyMap) {
    if (!roomId || !song) { return }

    const payload = {
        ...song,
        roomId,
    } 

    const { data, error } = await supabase
        .from('songs')
        .upsert(payload, {
            onConflict: 'auxpartyId'
        })
        .select()
    
    if (error || data.length == 0) {
        return
    }

    return data[0]
}