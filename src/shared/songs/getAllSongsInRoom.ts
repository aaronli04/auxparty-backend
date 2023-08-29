import supabase from "../../supabase/client";

export async function getAllSongsInRoom(roomId: string): Promise<string[]> {
    if (!roomId) { return }

    const { data, error } = await supabase
        .from('songs')
        .select()
        .eq('roomId', roomId)

    if (error) {
        return
    }

    let songs = []

    if (data.length === 0) {
        return songs
    }

    data.forEach((song) => {
        const auxpartyId = song.auxpartyId
        songs.push(auxpartyId)
    })

    return songs
}