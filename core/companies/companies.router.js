import { Router } from 'express';

import { COMPANIES_PATH } from './companies.constant.js';
import { companiesController } from './companies.controller.js';

export const companiesRouter = new Router();

companiesRouter.get(COMPANIES_PATH, companiesController.index);
companiesRouter.get(`${COMPANIES_PATH}/:id`, companiesController.view);
companiesRouter.post(COMPANIES_PATH, companiesController.create);
companiesRouter.put(COMPANIES_PATH, companiesController.update);
companiesRouter.delete(COMPANIES_PATH, companiesController.destroy);