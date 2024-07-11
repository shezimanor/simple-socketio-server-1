import cors from 'cors';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(cors());

app.get('/', (request, response) => {
  response.send('<h1>Hello Express Server</h1>');
});

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
