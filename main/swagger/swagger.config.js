import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Companies API',
      version: '1.0.0',
      description: "API CRUD",
      servers: [
        {
          url: 'http://localhost:2114',
          description: 'Development server',
        },
      ],
    },
    components: {
      securitySchemes: {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          in: 'header',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      jwt: []
    }],
  },
  apis: ['./core/*/*.router.js']
};

export const swaggerDocs = swaggerJsdoc(options);