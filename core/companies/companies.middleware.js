import { check, validationResult } from 'express-validator';

import { ExeptionApi } from '../../lib/exeption/exeption.api.js';      

export const companiesCreateDataValidatorMiddleware = async (request, response, next) => {
  await check('name')
    .not().isEmpty()
    .isLength({ min: 3, max: 32 })
    .run(request);
  await check('shortName')
    .not().isEmpty()
    .isLength({ min: 3, max: 15 })
    .run(request);
  await check('type')
    .not().isEmpty()
    .run(request);
  await check('status')
    .not().isEmpty()
    .run(request);
  await check('businessEntity')
    .not().isEmpty()
    .run(request);
  const errors = validationResult(request);
  return errors.isEmpty()
    ? next()
    : next(ExeptionApi.BadRequest('Ошибка при валидации', errors.array()));
}

export const companiesUpdateDataValidatorMiddleware = async (request, response, next) => {
  await check('name')
    .isLength({ min: 3, max: 32 })
    .run(request);
  await check('shortName')
    .isLength({ min: 3, max: 32 })
    .run(request);
  await check('type')
    .run(request);
  await check('status')
    .run(request);
  await check('businessEntity')
    .run(request);
  await check('contactId')
    .isNumeric()
    .run(request);
  const errors = validationResult(request);
  return errors.isEmpty()
    ? next()
    : next(ExeptionApi.BadRequest('Ошибка при валидации', errors.array()));
}