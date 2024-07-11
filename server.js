import express from 'express';
import http from 'http';
import { dirname } from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
// io: Server Instance
const io = new Server(server, {
  // https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: 'http://localhost:5173'
  }
});
const port = 3000;
// ESModule 的 __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use(cors());

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  // socket: Server Socket
  console.log(`A new user connected with id: ${socket.id}`);
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
