import supabase from "../../supabase/client";
import { StringKeyMap } from "../../types";
import { sortQueue } from "../../utils/helpers/sortQueue";

export async function addSongToRoom(roomId: string, song: StringKeyMap) {
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
    songArray.push(song.auxpartyId)
    const currentlyPlaying = roomData[0].currentlyPlaying ? JSON.parse(roomData[0].currentlyPlaying): 0
    const updatedArray = await sortQueue(songArray, currentlyPlaying)

    let songIds = []
    for (const completeSong of updatedArray) {
        songIds.push(completeSong.auxpartyId)
    }

    const { data: updatedData, error: updateError } = await supabase
        .from('rooms')
        .update({ queue: songIds })
        .match({ auxpartyId: roomId })

    if (updateError) {
        console.error("Error updating songs array:", updateError.message)
        return
    }

    return updatedArray
}