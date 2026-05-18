export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoTech Assets API',
      version: '1.0.0',
      description: 'EcoTech Assets API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Local server (development)',
      },
    ],
  },
  apis: ['./src/modules/**/docs/*.yaml', './src/shared/docs/*.yaml'],
};
