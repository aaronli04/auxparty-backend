import supabase from "../../supabase/client";
import { Room } from "../../types";

export async function getRoomByName(name: string): Promise<Room | null> {
    const { data, error } = await supabase
        .from('rooms')
        .select()
        .eq('name', name)
        .limit(1)

    if (error || data.length === 0) { return null }
    return data[0];
}