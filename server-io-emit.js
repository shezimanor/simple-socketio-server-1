import { Server } from 'socket.io';

const port = 3000;
// io: Server Instance
const io = new Server(port, {
  // https://socket.io/docs/v4/handling-cors/
  cors: {
    origin: 'http://localhost:5173'
  }
});

const users = {};

io.on('connection', (socket) => {
  socket.on('user-score', (userScore) => {
    users[`${socket.id}`] = userScore;
    // boardcast all clients
    io.emit('user-score', users);
  });
});
