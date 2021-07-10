import { Router } from 'express';

import { companiesRouter } from '../../core/companies/index.js';

export const router = new Router();

router.use(companiesRouter);