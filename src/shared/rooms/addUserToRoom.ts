import supabase from "../../supabase/client";

export async function addUserToRoom(userId: string, roomId: string) {
  if (!userId || !roomId) { return; }

  const { data: roomData, error } = await supabase
    .from('rooms')
    .select()
    .eq('auxpartyId', roomId)
    .limit(1)

  if (error) {
    console.error("Error fetching room data:", error.message);
    return;
  }

  let membersArray = roomData[0].members ? JSON.parse(roomData[0].members) : [];

  if (!membersArray.includes(userId)) {
    membersArray.push(userId);

    const { data: updatedData, error: updateError } = await supabase
      .from('rooms')
      .update({ members: membersArray })
      .match({ auxpartyId: roomId });

    if (updateError) {
      console.error("Error updating users array:", updateError.message);
      return;
    }
  }

  return membersArray;
}





