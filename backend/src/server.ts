import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import 'dotenv/config';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('EcoTech Assets API is running 🚀');
});

io.on('connection', (socket) => {
  console.log('A client connected:', socket.id);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
