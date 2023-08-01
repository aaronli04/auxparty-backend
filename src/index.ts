import app from './routes/index';
import { createServer } from 'http';
import { setupSocket } from './websocket/socket';

const port = process.env.PORT || 8080;

const server = createServer(app);
setupSocket(server);

server.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`);
});
