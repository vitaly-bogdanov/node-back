import { ExeptionApi } from './exeption.api.js';
import { initLogger } from '../../main/logger/index.js';

const logger = initLogger(import.meta.url);

export const exeptionMiddleware = (error, request, response, next) => {
  logger.error(error);
  if (error instanceof ExeptionApi) {
    return response.status(error.status).json({ message: error.message, errors: error.errors });
  }
  return response.status(500).json({ message: 'Непредвиденная ошибка' });
}