import supabase from "../../supabase/client";

export async function deleteAllVotesOfSong(songId: string) {
    if (!songId) { return }

    const { data, error } = await supabase
        .from('votes')
        .delete()
        .eq('auxpartyId', songId)
}