import { Router } from 'express';

import { index, view, create, update, destroy } from './contacts.controller.js';
import { CONTACTS_PATH } from './contacts.constant.js';
import { tokenAccessGuardMiddleware } from '../../lib/token/index.js';
import { 
  contactsCreateDataValidatorMiddleware, 
  contactsUpdateDataValidatorMiddleware 
} from './contacts.middleware.js';

export const contactsRouter = new Router();

/**
 * @swagger
 * /contacts:
 *  get:
 *    summary: "Получить массив контактов"
 *    tags: [Contacts]
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
contactsRouter.get(CONTACTS_PATH, [
  tokenAccessGuardMiddleware
], index);

/**
 * @swagger
 * /contacts/{contactId}:
 *  get:
 *    summary: "Получить контакт по id"
 *    tags: [Contacts]
 *    parameters:
 *    - name: "contactId"
 *      in: "path"
 *      require: true
 *      default: 1
 *      description: "id контакта"
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
contactsRouter.get(`${CONTACTS_PATH}/:id`, [
  tokenAccessGuardMiddleware
], view);

/**
 * @swagger
 * /contacts:
 *  post:
 *    summary: "Создать запись contact"
 *    tags: [Contacts]
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: "object"
 *            properties:
 *              lastname:
 *                type: "string"
 *                example: "Test LastName"
 *                description: "test lastname"
 *              firstname:
 *                type: "string"
 *                example: "Test FirstName"
 *                description: "test firstname"
 *              patronymic:
 *                type: "string"
 *                example: "Test Patronymic"
 *                description: "test patronymic"
 *              phone:
 *                type: "string"
 *                example: "+79240859417"
 *                description: "поле телефонного номера"
 *              email:
 *                type: "string"
 *                example: "test123@test.com"
 *                description: "Поле электронной почты"
 *    responses:
 *      201:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
contactsRouter.post(CONTACTS_PATH, [
  tokenAccessGuardMiddleware,
  contactsCreateDataValidatorMiddleware
], create);

/**
 * @swagger
 * /contacts/{contactId}:
 *  put:
 *    summary: "Редактировать запись contact"
 *    tags: [Contacts]
 *    parameters:
 *    - name: "contactId"
 *      in: "path"
 *      require: true
 *      default: 2
 *      description: "id контакта"
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: "object"
 *            properties:
 *              lastname:
 *                type: "string"
 *                example: "Test LastName"
 *                description: "test lastname"
 *              firstname:
 *                type: "string"
 *                example: "Test FirstName"
 *                description: "test firstname"
 *              patronymic:
 *                type: "string"
 *                example: "Test Patronymic"
 *                description: "test patronymic"
 *              phone:
 *                type: "string"
 *                example: "+79240859417"
 *                description: "поле телефонного номера"
 *              email:
 *                type: "string"
 *                example: "test123@test.com"
 *                description: "Поле электронной почты"
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
contactsRouter.put(`${CONTACTS_PATH}/:id`, [
  tokenAccessGuardMiddleware,
  contactsUpdateDataValidatorMiddleware
], update);



/**
 * @swagger
 * /contacts/{contactId}:
 *  delete:
 *    summary: "Удалить запись компании по id"
 *    tags: [Contacts]
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 *    parameters:
 *    - name: "contactId"
 *      in: "path"
 *      description: "id контакта"
 *      required: true
 *      default: 1
 */
contactsRouter.delete(`${CONTACTS_PATH}/:id`, [
  tokenAccessGuardMiddleware
], destroy);