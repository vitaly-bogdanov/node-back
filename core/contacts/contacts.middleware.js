import { check, validationResult } from 'express-validator';

import { ExeptionApi } from '../../lib/exeption/exeption.api.js'; 

export const contactsCreateDataValidatorMiddleware = async (request, response, next) => {
  await check('lastname')
    .not().isEmpty()
    .isLength({ min: 3, max: 32 })
    .run(request);
  await check('firstname')
    .not().isEmpty()
    .isLength({ min: 3, max: 15 })
    .run(request);
  await check('patronymic')
    .not().isEmpty()
    .isLength({ min: 3, max: 15 })
    .run(request);
  await check('phone')
    .isMobilePhone('ru-RU')
    .not().isEmpty()
    .run(request);
  await check('email')
    .isEmail()
    .not().isEmpty()
    .run(request);
  const errors = validationResult(request);
  return errors.isEmpty()
    ? next()
    : next(ExeptionApi.BadRequest('Ошибка при валидации', errors.array()));
}

export const contactsUpdateDataValidatorMiddleware = async (request, response, next) => {
  await check('lastname')
    .isLength({ min: 3, max: 32 })
    .run(request);
  await check('firstname')
    .isLength({ min: 3, max: 15 })
    .run(request);
  await check('patronymic')
    .isLength({ min: 3, max: 15 })
    .run(request);
  await check('phone')
    .isMobilePhone('ru-RU')
    .run(request);
  await check('email')
    .isEmail()
    .run(request);
  const errors = validationResult(request);
  return errors.isEmpty()
    ? next()
    : next(ExeptionApi.BadRequest('Ошибка при валидации', errors.array()));
}