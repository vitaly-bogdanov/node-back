import { Router } from 'express';
import multer from 'multer';

import { index, view, create, destroy } from './images.controller.js';
import { IMAGES_PATH, UPLOADS_DIR } from './images.constant.js';
import { addCompanyImageMiddleware } from './images.middleware.js';

const fileHandler = multer({ dest: UPLOADS_DIR });

export const imagesRouter = new Router();

/**
 * @swagger
 * /images:
 *  get:
 *    summary: "Получить массив images"
 *    tags: [Images]
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
imagesRouter.get(IMAGES_PATH, index);

/**
 * @swagger
 * /images/{imageId}:
 *  get:
 *    summary: "Получить image по id"
 *    tags: [Images]
 *    parameters:
 *    - name: "imageId"
 *      in: "path"
 *      require: true
 *      default: 1
 *      description: "id image"
 *    responses:
 *      200:
 *        description: "Успешное выполнение"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
imagesRouter.get(`${IMAGES_PATH}/:id`, view);

/**
 * @swagger
 * /images:
 *  post:
 *    summary: "Создать запись с картинкой и привзявть ее к записи компании"
 *    tags: [Images]
 *    consumes:
 *    - multipart/form-data
 *    parameters:
 *    - name: "upfile"
 *      in: "formData"
 *      type: "file"
 *    - name: "companyId"
 *      in: "formData"
 *      type: "integer"
 *      
 *    responses:
 *      201:
 *        description: "Запись успешно создана"
 *      400:
 *        description: "Ошибка валидации"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
imagesRouter.post(IMAGES_PATH, [
  addCompanyImageMiddleware,
  fileHandler.fields([{ name: 'file', maxCount: 1 }])
], create);

/**
 * @swagger
 * /images/{imageId}:
 *  delete:
 *    summary: "Удалить запись по id"
 *    tags: [Images]
 *    parameters:
 *    - name: "imageId"
 *      in: "path"
 *      require: true
 *      default: 1
 *      description: "id записика картинки, которая будет удалена"
 *    responses:
 *      200:
 *        description: "Запись успешно создана"
 *      401:
 *        description: "Пользователь не авторизован"
 *      500:
 *        description: "Непредвиденная ошибка"
 */
imagesRouter.delete(`${IMAGES_PATH}/:id`, destroy);