import supabase from "../../supabase/client";
import { Room } from "../../types";

export async function getAllRooms(): Promise<Room[] | null> {
    const { data, error } = await supabase
        .from('rooms')
        .select()
    if (error) { return null }
    return data;
}