import log4js from 'log4js';

import { LOG } from './logger.constant.js';

const logAppenders = {
  file: { type: 'file', filename: LOG.PATH },
}

if (LOG.CONSOLE) {
  logAppenders.console = { type: 'console' };
}

export default log4js.configure({
  appenders: logAppenders,
  categories: {
    default: {
      appenders: Object.keys(logAppenders),
      level: 'ALL',
    },
  },
});

