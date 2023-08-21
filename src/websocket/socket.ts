import { Server } from 'socket.io';
import { addUserToRoom } from '../shared/rooms/addUserToRoom';
import { updateAccessToken } from '../shared/user/updateAccessToken';
import { deleteRoomByAuxpartyId } from '../shared/rooms/deleteRoomByAuxpartyId';
import { addSongToRoom } from '../shared/rooms/addSongToRoom';

export function setupSocket(server) {
    const io = new Server(server, {
        path: '/socket.io',
        serveClient: false,
        cors: {
            origin: process.env.FRONTEND_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        socket.on('ping', () => {
            socket.emit('pong');
        })

        socket.on('joinRoom', async (user, room) => {
            socket.join(room);
            await addUserToRoom(user, room);
        })

        socket.on('addSong', async (room, song) => {
            socket.join(room)
            await addSongToRoom(room, song)
            io.to(room).emit('songAdded', song)
        });

        socket.on('updateAccessToken', async (auxpartyId, accessToken) => {
            socket.join(auxpartyId)
            const updatedToken = (await updateAccessToken({ auxpartyId, accessToken })).accessToken
            io.to(auxpartyId).emit('accessTokenUpdated', { updatedToken })
        })

        socket.on('deleteRoom', async (auxpartyId) => {
            socket.join(auxpartyId)
            await deleteRoomByAuxpartyId(auxpartyId)
            io.to(auxpartyId).emit('roomDeleted')
        })

        socket.on('disconnect', () => {
        });
    });
}