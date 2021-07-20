import fs from 'fs';
import path from 'path';

import { ExeptionApi } from '../../lib/exeption/exeption.api.js';
import { remove } from './images.service.js';

export const addCompanyImageMiddleware = async (request, response, next) => {
  try {
    if (!request?.files?.file?.[0]) throw ExeptionApi.BadRequest('No file for upload passed');
    if (!req?.params?.id) throw ExeptionApi.BadRequest('No company ID passed for file upload');
    const file = req.files.file[0];
    const fileExtention = path.extname(file.originalname).toLowerCase();
    const tempFilePath = file.path;
    if (!(fileExtention === '.png' || fileExtention === '.jpg' || fileExtention === '.jpeg' || fileExtention === '.gif')) {
      remove(tempFilePath)
        .catch(error => { throw error });
      throw ExeptionApi.BadRequest('Only image files are allowed');
    }
    return next();
  } catch (error) {
    next(error);
  }
};