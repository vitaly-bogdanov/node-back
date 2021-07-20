import { Router } from 'express';

import { companiesRouter } from '../../core/companies/index.js';
import { contactsRouter } from '../../core/contacts/index.js';
import { usersRouter } from '../../core/users/index.js';
import { imagesRouter } from '../../core/images/index.js';

export const router = new Router()
  .use(companiesRouter)
  .use(usersRouter)
  .use(contactsRouter)
  .use(imagesRouter)