import httpContext from 'express-http-context';

import { LOG } from './logger.constant.js';

export const formatMessageService = (error) => {
  const user = httpContext.get('user');
  const method = httpContext.get('method');
  const url = httpContext.get('url');

  const messageArr = [];
  if (user) {
    messageArr.push(`User: ${user}`);
  }
  if (method) {
    messageArr.push(`${method}`);
  }
  if (url) {
    messageArr.push(`${url}`);
  }
  if (LOG.DEBUG && error instanceof Error) {
    messageArr.push(error.message + error.stack);
  } else {
    messageArr.push(error);
  }
  return messageArr.join(' -> ');
}