import supabase from "../../supabase/client";
import { User } from "../../types";

export async function getUserByAuxpartyId(auxpartyId: string): Promise<User | null> {
    const { data, error } = await supabase
        .from('users')
        .select()
        .eq('auxpartyId', auxpartyId)
        .limit(1)

    if (error || data.length === 0) { return null }
    return data[0];
}