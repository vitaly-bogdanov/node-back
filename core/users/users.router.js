import { Router } from 'express';

import { 
  signUp, 
  logIn, 
  logOut, 
  refreshAccessToken 
} from './users.controller.js';
import { USERS_PATH } from './users.constant.js';
import { 
  usersSignUpDataValidatorMiddleware, 
  usersLogInDataValidatorMiddleware 
} from './users.middleware.js';

export const usersRouter = new Router();

/**
 * @swagger
 * /users/signup:
 *  post:
 *   description: ""
 *   summary: "Регистрация пользователя"
 *   tags: [Users]
 *   consumes:
 *   - "application/json"
 *   produces:
 *   - "application/json"
 *   requestBody:
 *     description: "Регистрация пользователя"
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: "object"
 *           properties:
 *             name:
 *               type: "string"
 *               example: "Alex"
 *               description: "Имя регистрируемого пользователя(должно быть уникальным)"
 *             password:
 *               type: "string"
 *               example: "123456789"
 *               description: "Пароль для нового пользователя"
 *             confirmPassword:
 *               type: "string"
 *               example: "123456789"
 *               description: "Подтверждение пароля"
 *   responses:
 *     201:
 *       description: "Успешная регистрация"
 *     400:
 *       description: "Ошибка при валидации или пользователь с данным именем уже существует"
 *     500:
 *       description: "Непредвиденная ошибка"
 */
usersRouter.post(`${USERS_PATH}/signup`, [ usersSignUpDataValidatorMiddleware ], signUp);

/**
 * @swagger
 * /users/login:
 *  post:
 *   description: ""
 *   summary: "Авторизация пользователя"
 *   tags: [Users]
 *   requestBody:
 *     description: "Авторизация пользователя"
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: "object"
 *           properties:
 *             name:
 *               type: "string"
 *               example: "Alex"
 *               description: "Имя пользователя"
 *             password:
 *               type: "string"
 *               example: "123456789"
 *               description: "Пароль"
 *   responses:
 *     200:
 *       description: "Успешная авторизация"
 *     400:
 *       description: "Ошибка при валидации или пользователь с данным именем не существует"
 *     500:
 *       description: "Непредвиденная ошибка"
 */
usersRouter.post(`${USERS_PATH}/login`, [ usersLogInDataValidatorMiddleware ], logIn);

/**
 * @swagger
 * /users/logout:
 *  delete:
 *   description: ""
 *   summary: "Деавторизация"
 *   tags: [Users]
 *   parameters:
 *   - name: "refreshToken"
 *     in: "cookie"
 *     required: true
 *     type: "string"
 *     description: "Удаляем данный refresh token"
 *   responses:
 *     200:
 *       description: "Успешная деавторизация"
 *     500:
 *       description: "Непредвиденная ошибка"
 */
usersRouter.delete(`${USERS_PATH}/logout`, logOut);

/**
 * @swagger
 * /users/refresh-access-token:
 *  put:
 *   description: ""
 *   summary: "Обновление токена"
 *   tags: [Users]
 *   parameters:
 *   - name: "refreshToken"
 *     in: "cookie"
 *     required: true
 *     type: "string"
 *     description: "refresh token"
 *   responses:
 *     200:
 *       description: "Успешное обновление access token'а и refresh token'a"
 *     500:
 *       description: "Непредвиденная ошибка"
 */
usersRouter.put(`${USERS_PATH}/refresh-access-token`, refreshAccessToken);