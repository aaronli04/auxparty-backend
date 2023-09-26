import { Server } from 'socket.io';
import { addUserToRoom } from '../shared/rooms/addUserToRoom';
import { updateAccessToken } from '../shared/user/updateAccessToken';
import { deleteRoomByAuxpartyId } from '../shared/rooms/deleteRoomByAuxpartyId';
import { addSongToRoom } from '../shared/rooms/addSongToRoom';
import { addVoteToSong } from '../shared/votes/addVoteToSong';
import { getVotesBySong } from '../shared/votes/getVotesBySong';
import { addSongToSongs } from '../shared/songs/addSongToSongs';
import { getSongByAuxpartyId } from '../shared/songs/getSongByAuxpartyId';
import { setCurrentlyPlaying } from '../shared/rooms/setCurrentlyPlaying';
import { getAllSongsInRoom } from '../shared/songs/getAllSongsInRoom';
import { deleteAllSongsInRoom } from '../shared/songs/deleteAllSongsInRoom';
import { deleteAllVotesOfSong } from '../shared/votes/deleteAllVotesOfSong';
import { sortQueue } from '../utils/helpers/sortQueue';
import { getRoomByAuxpartyId } from '../shared/rooms/getRoomByAuxpartyId';

export function setupSocket(server) {
    const io = new Server(server, {
        path: '/socket.io',
        serveClient: false,
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    })

    io.on("connection", (socket) => {
        socket.on('ping', () => {
            socket.emit('pong')
        })

        socket.on('joinRoom', async (user, room) => {
            socket.join(room)
            await addUserToRoom(user, room)
        })

        socket.on('addSong', async (room, song) => {
            socket.join(room)
            await addSongToSongs(room, song)
            const songs = await addSongToRoom(room, song)
            io.to(room).emit('songAdded', songs)
        });

        socket.on('updateAccessToken', async (auxpartyId, accessToken) => {
            socket.join(auxpartyId)
            const updatedToken = (await updateAccessToken({ auxpartyId, accessToken })).accessToken
            io.to(auxpartyId).emit('accessTokenUpdated', { updatedToken })
        })

        socket.on('deleteRoom', async (auxpartyId) => {
            socket.join(auxpartyId)
            const songs = await getAllSongsInRoom(auxpartyId)
            for (let i = 0; i < songs.length; ++i) {
                await deleteAllVotesOfSong(songs[i])
            }
            await deleteAllSongsInRoom(auxpartyId)
            await deleteRoomByAuxpartyId(auxpartyId)
            io.to(auxpartyId).emit('roomDeleted')
        })

        socket.on('addVote', async (roomId, songId, userId, voteValue) => {
            socket.join(roomId)
            const currentRoom = await getRoomByAuxpartyId(roomId)
            const recentVote = await addVoteToSong({auxpartyId: songId, userId, voteValue})
            const songIds = await getAllSongsInRoom(roomId)
            const newQueue = await sortQueue(songIds, currentRoom.currentlyPlaying)
            io.to(roomId).emit('voteAdded', newQueue)
        })

        socket.on('setCurrentlyPlaying', async (roomId, currentlyPlaying) => {
            socket.join(roomId)
            const response = await setCurrentlyPlaying({auxpartyId: roomId, currentlyPlaying})
            io.to(roomId).emit('currentlyPlayingSet', currentlyPlaying)
        })

        socket.on('disconnect', () => {
        });
    });
}