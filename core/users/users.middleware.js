import { check, validationResult } from 'express-validator';

import { ExeptionApi } from '../../lib/exeption/exeption.api.js';

export const usersSignUpDataValidatorMiddleware = async (request, response, next) => {
  await check('name')
    .notEmpty()
    .run(request);
  await check('password')
    .notEmpty()
    .equals(request.body.confirmPassword)
    .run(request);
  await check('confirmPassword')
    .notEmpty()
    .run(request);
  const errors = validationResult(request);
  return errors.isEmpty()
    ? next()
    : next(ExeptionApi.BadRequest('Ошибка при валидации', errors.array()));
}

export const usersLogInDataValidatorMiddleware = async (request, response, next) => {
  await check('name')
    .notEmpty()
    .run(request);
  await check('password')
    .notEmpty()
    .run(request);
  const errors = validationResult(request);
  return errors.isEmpty()
    ? next()
    : next(ExeptionApi.BadRequest('Ошибка при валидации', errors.array()))
}