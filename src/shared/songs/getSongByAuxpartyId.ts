import supabase from "../../supabase/client";
import { Song } from "../../types";

export async function getSongByAuxpartyId(auxpartyId: string): Promise<Song | null> {
    const { data, error } = await supabase
        .from('songs')
        .select()
        .eq('auxpartyId', auxpartyId)
        .limit(1)

    if (error || data.length === 0) { return null }
    return data[0]
}