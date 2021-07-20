import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { swaggerDocs } from './swagger.config.js';

console.log(swaggerDocs);

export const swaggerRouter = new Router()
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));