import { ExeptionApi } from '../exeption/index.js';

import { validateAccessTokenService } from './token.service.js';

export const tokenAccessGuardMiddleware = (request, response, next) => {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) return next(ExeptionApi.UnauthorizedError());
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) return next(ExeptionApi.UnauthorizedError());
    const userData = validateAccessTokenService(accessToken);
    if (!userData) return next(ExeptionApi.UnauthorizedError());
    request.user = userData;
    next();
  } catch (error) {
    next(ExeptionApi.UnauthorizedError());
  }
}