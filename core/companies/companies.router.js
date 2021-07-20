import { Router } from 'express';

import { COMPANIES_PATH } from './companies.constant.js';
import { index, view, create, update, destroy } from './companies.controller.js';
import { 
  companiesCreateDataValidatorMiddleware, 
  companiesUpdateDataValidatorMiddleware 
} from './companies.middleware.js';
import {
  tokenAccessGuardMiddleware
} from '../../lib/token/index.js';

export const companiesRouter = new Router();

/**
 * @swagger
 * /companies:
 *  get:
 *    security:
 *      jwt: []
 *    description: ""
 *    summary: "Получение массива компаний"
 *    tags: [Companies]
 *    parameters:
 *    - name: "type"
 *      in: "query"
 *      required: false
 *      type: "string"
 *      default: "agent"
 *      description: "Тип компании: agent или contractor"
 *    - name: "status"
 *      in: "query"
 *      required: false
 *      type: "string"
 *      default: "active"
 *      description: "active или inactive"
 *    - name: "gte"
 *      in: "query"
 *      required: false
 *      type: "string"
 *    - name: "lt"
 *      in: "query"
 *      required: false
 *      type: "string"
 *    - name: "step"
 *      in: "query"
 *      required: false
 *      type: "integer"
 *      default: 2
 *      description: "шаг пагинации"
 *    - name: "take"
 *      in: "query"
 *      required: false
 *      type: "integer"
 *      default: 5
 *      description: "число записей на шаге пагинации"
 *    - name: "image"
 *      in: "query"
 *      required: false
 *      type: "string"
 *      default: "get"
 *      description: "жадная загрузка для связаных записей image"
 *    - name: "address"
 *      in: "query"
 *      required: false
 *      type: "string"
 *      default: "get"
 *      description: "жадная загрузка для связаных записей address"
 *    consumes:
 *    - "application/json"
 *    produces:
 *    - "application/xml"
 *    - "application/json"
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
companiesRouter.get(COMPANIES_PATH, [
  tokenAccessGuardMiddleware
], index);


/**
 * @swagger
 * /companies/{companyId}:
 *  get:
 *    summary: "Получить запись компании по id"
 *    tags: [Companies]
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 *    parameters:
 *    - name: "companyId"
 *      in: "path"
 *      description: "id компании"
 *      required: true
 *      default: 1
 */
companiesRouter.get(`${COMPANIES_PATH}/:id`, [
  tokenAccessGuardMiddleware
], view);

/**
 * @swagger
 * /companies:
 *  post:
 *    summary: "Создание записи компании"
 *    tags: [Companies]
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: "object"
 *            properties:
 *              name:
 *                type: "string"
 *                example: "Тестовая компание"
 *                description: "Название компании"
 *              shortName:
 *                type: "string"
 *                example: "Тестовая"
 *                description: "Короткое название компании"
 *              businessEntity:
 *                type: "string"
 *                example: "ООО"
 *                description: "ООО или ОАО"
 *              type:
 *                type: "string"
 *                example: "agent"
 *                description: "Тип компании: agent или contractor"
 *              status:
 *                type: "string"
 *                example: "inactive"
 *                description: "active или inactive"
 *              contactId:
 *                type: "integer"
 *                example: 1
 *                description: "id связанной записи контакта"
 *    responses:
 *      201:
 *        description: "Запись компании успешно создана"
 *      400:
 *        description: "Ошибка валидации"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
companiesRouter.post(COMPANIES_PATH, [
  tokenAccessGuardMiddleware,
  companiesCreateDataValidatorMiddleware
], create);


/**
 * @swagger
 * /companies/{companyId}:
 *  put:
 *    summary: "Редактирование записи компании"
 *    tags: [Companies]
 *    parameters:
 *    - name: "companyId"
 *      in: "path"
 *      require: true
 *      default: 2
 *      description: "id компании"
 *    requestBody:
 *      description: ""
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: "object"
 *            properties:
 *              name:
 *                type: "string"
 *                example: "Тестовая компание (Изменено)"
 *                description: "Название компании"
 *              shortName:
 *                type: "string"
 *                example: "Тестовая (Изменено)"
 *                description: "Короткое название компании"
 *              businessEntity:
 *                type: "string"
 *                example: "ОАО"
 *                description: "ООО или ОАО"
 *              type:
 *                type: "string"
 *                example: "contractor"
 *                description: "Тип компании: agent или contractor"
 *              status:
 *                type: "string"
 *                example: "active"
 *                description: "active или inactive"
 *              contactId:
 *                type: "integer"
 *                example: 2
 *                description: "id связанной записи контакта"
 *    responses:
 *      200:
 *        description: "Запись компании успешно изменена"
 *      400:
 *        description: "Ошибка валидации"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
companiesRouter.put(`${COMPANIES_PATH}/:id`, [
  tokenAccessGuardMiddleware,
  companiesUpdateDataValidatorMiddleware
], update);


/**
 * @swagger
 * /companies/{companyId}:
 *  delete:
 *    summary: "Удалить запись компании по id"
 *    tags: [Companies]
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 *    parameters:
 *    - name: "companyId"
 *      in: "path"
 *      description: "id компании"
 *      required: true
 *      default: 1
 */
companiesRouter.delete(`${COMPANIES_PATH}/:id`, [
  tokenAccessGuardMiddleware,
], destroy);
