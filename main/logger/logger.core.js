import path from 'path';

import { formatMessageService } from './logger.service.js';
import log4js from './logger.config.js';

export const initLogger = (filePath) => {
  const parts = filePath.split(path.sep);
  const moduleLabel = parts[parts.length - 1];
  const log4jsLogger = log4js.getLogger(moduleLabel);
  const logger = {
    info: (message) => { log4jsLogger.info(formatMessageService(message)) },
    error: (message) => { log4jsLogger.error(formatMessageService(message)) },
    debug: (message) => { log4jsLogger.debug(formatMessageService(message)) },
  };
  return logger;
};