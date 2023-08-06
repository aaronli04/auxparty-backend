import { Server } from 'socket.io';
import { addUserToRoom } from '../shared/rooms/addUserToRoom';

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

        socket.on('disconnect', () => {
        });
    });
}