import supabase from "../../supabase/client";

export async function deleteRoomByAuxpartyId(auxpartyId: string) {
    const { data, error } = await supabase
        .from('rooms')
        .delete()
        .eq('auxpartyId', auxpartyId)

    if (error) {
        return
    }
}