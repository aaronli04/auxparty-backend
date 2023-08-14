import { Server } from 'socket.io';
import { addUserToRoom } from '../shared/rooms/addUserToRoom';
import { updateAccessToken } from '../shared/user/updateAccessToken';
import { deleteRoomByAuxpartyId } from '../shared/rooms/deleteRoomByAuxpartyId';

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

        socket.on('join-room', async (user, room) => {
            socket.join(room);
            await addUserToRoom(user, room);
        })

        socket.on('add-song', (room, song) => {
            socket.join(room)
            io.to(room).emit('song-added', { user: socket.id, song });
        });

        socket.on('updateAccessToken', async (auxpartyId, accessToken) => {
            socket.join(auxpartyId)
            const updatedToken = (await updateAccessToken({ auxpartyId, accessToken })).accessToken
            io.to(auxpartyId).emit('access-token-updated', { updatedToken })
        })

        socket.on('deleteRoom', async (auxpartyId) => {
            socket.join(auxpartyId)
            await deleteRoomByAuxpartyId(auxpartyId)
            io.to(auxpartyId).emit('room-deleted')
        })

        socket.on('disconnect', () => {
        });
    });
}