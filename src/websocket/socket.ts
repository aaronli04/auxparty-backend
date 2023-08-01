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
      socket.on('join-room', (user, room) => {
        socket.join(room)
        console.log(`${user} joined ${room}`)
        addUserToRoom(user, room)
      })

      socket.on('disconnect', () => {
        const rooms = Object.keys(socket.rooms);
        rooms.shift();
        rooms.forEach(room => {
          socket.leave(room);
          console.log(`${socket.id} left room ${room}`);
        });
      });
    });
}