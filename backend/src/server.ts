import { createServer } from 'http';

import './config/env.config.js';
import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import { Server } from 'socket.io';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { prisma } from './shared/infrastructure/prisma/prisma.instance.js';
import { errorHandler } from './shared/middleware/errorHandler.js';
import { swaggerOptions } from './shared/docs/swaggerConfig.js';

import { apiRouter } from './apiRoutes.js';

const app = express();
app.use(express.json());
app.use(morgan('dev'));

if (process.env.NODE_ENV !== 'production') {
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = process.env.PORT || 3000;

app.use('/api', apiRouter);

io.on('connection', (socket) => {
  console.info('A client connected:', socket.id);
});

app.use(errorHandler);

export { app };

async function startServer(): Promise<void> {
  const dbName = process.env.DB_NAME;
  try {
    await prisma.$connect();
    console.info(`✅ Connected to the database: ${dbName}`);
    httpServer.listen(PORT, () => {
      console.info(`🚀Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error connecting to the database:', error);
    process.exit(1);
  }
}

// Solo arranca el servidor si este archivo es el entrypoint principal
if (process.env.NODE_ENV !== 'test') {
  startServer();
}
