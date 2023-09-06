import { getSongByAuxpartyId } from "../shared/songs/getSongByAuxpartyId";
import { getVotesBySong } from "../shared/votes/getVotesBySong";
import { StringKeyMap } from "../types";

export async function sortQueue(songArray: string[], currentlyPlaying: number): Promise<StringKeyMap[]> {
    const songsArray = []
    
    for (const song of songArray) {
        const songData = await getSongByAuxpartyId(song)
        const voteCount = await getVotesBySong({ auxpartyId: song })
        
        const songObject = {
            auxpartyId: songData.auxpartyId,
            albumCover: songData.albumCover,
            name: songData.name,
            artists: songData.artists,
            uri: songData.uri,
            roomId: songData.roomId,
            voteCount,
        }

        songsArray.push(songObject)
    }

    const songsBefore = songsArray.slice(0, currentlyPlaying + 1)
    const songsAfter = songsArray.slice(currentlyPlaying + 1)
    const sortedSongsAfter = songsAfter.slice().sort((a, b) => b.voteCount - a.voteCount)
    const finalSongs = songsBefore.concat(sortedSongsAfter)
    const updatedArray = finalSongs.map((song) => song.auxpartyId)

    return updatedArray
}