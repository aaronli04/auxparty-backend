import supabase from "../../supabase/client";

export async function addSongToRoom(roomId: string, song: string) {
    if (!roomId || !song) { return }

    const { data: roomData, error } = await supabase
        .from('rooms')
        .select()
        .eq('auxpartyId', roomId)
        .limit(1)

    if (error) {
        console.error("Error fetching room data:", error.message)
        return
    }

    let songArray = roomData[0].queue ? JSON.parse(roomData[0].queue) : []

    songArray.push(song);

    const { data: updatedData, error: updateError } = await supabase
        .from('rooms')
        .update({ queue: songArray })
        .match({ auxpartyId: roomId })

    if (updateError) {
        console.error("Error updating users array:", updateError.message)
        return
    }
}