import supabase from "../../supabase/client";

export async function deleteAllSongsInRoom(roomId: string) {
    if (!roomId) { return }

    const { data, error } = await supabase
        .from('songs')
        .delete()
        .eq('roomId', roomId)
}