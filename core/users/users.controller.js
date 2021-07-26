import { 
  createUserService, 
  findUserService,
  getUserWithHashPassword
} from './users.service.js';
import { 
  generateTokensPareService,
  createRefreshTokenService,
  updateRefreshTokenService,
  removeTokenService,
  validateRefreshTokenService
} from '../../lib/token/index.js';
import { UserDto } from './users.dto.js';
import { ExeptionApi } from '../../lib/exeption/exeption.api.js';
import { createHashService, isHashComparedService } from '../../lib/bcrypt/bcrypt.service.js';
import { initLogger } from '../../main/logger/index.js';

const logger = initLogger(import.meta.url);

/**
 * 
 * @description POST /users/signup
 */
export const signUp = async (request, response, next) => {
  logger.info('signup start');
  try {
    const userDto = new UserDto(request.body);
    const candidate = await findUserService({ name: userDto.name });
    if (candidate) throw ExeptionApi.BadRequest('Пользователь с таким именем уже существуе');
    const password = createHashService(userDto.password);
    const user = await createUserService({ name: userDto.name, password });
    const { accessToken, refreshToken } = generateTokensPareService(user);
    await createRefreshTokenService(user.id, refreshToken);
    logger.info('signup success');
    response.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    response.status(201).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description POST /users/login
 */
export const logIn = async (request, response, next) => {
  logger.info('login start');
  try {
    const userDto = new UserDto(request.body);
    const user = await getUserWithHashPassword({ name: userDto.name });
    console.log(user);
    if (!user) throw ExeptionApi.BadRequest('Пользователь не был найден');
    if (!isHashComparedService(userDto.password, user.password)) throw ExeptionApi.BadRequest('Неверный пароль');
    const { accessToken, refreshToken } = generateTokensPareService(user);
    await updateRefreshTokenService(user.id, refreshToken);
    logger.info('login success');
    response.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    response.status(201).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description DELETE /users/logout
 */
export const logOut = async (request, response, next) => {
  logger.info('logout start');
  try {
    const { refreshToken } = request.cookie;
    await removeTokenService(refreshToken);
    logger.info('logout success');
    request.clearCookie('refreshToken');
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description PUT /users/refresh-access-token
 */
export const refreshAccessToken = async (request, response, next) => {
  logger.info('refresh access token start');
  try {
    const { refreshToken } = request.cookie;
    if (!refreshToken) throw ExeptionApi.UnauthorizedError('Вы неавторизованны');
    const userData = validateRefreshTokenService(refreshToken);
    const userToken = await findUserService(refreshToken);
    if (!userData || !userToken) throw ExeptionApi.UnauthorizedError('Вы неавторизованны');
    const user = await findUserService(userData.id);
    const freshTokens = generateTokensPareService(user);
    await saveRefreshTokenService(user.id, freshTokens.refreshToken);
    logger.info('refresh access token success');
    response.cookie('refreshToken', freshTokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    response.status(201).json({ accessToken: freshTokens.accessToken, user });
  } catch (error) {
    next(error);
  }
};