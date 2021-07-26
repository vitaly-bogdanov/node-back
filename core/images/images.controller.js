import { initLogger } from '../../main/logger/index.js';
import { loadImage, createImage, getFileUrl, getImage, getImages, removeImage } from './images.service.js';

const logger = initLogger(import.meta.url);

/**
 * 
 * @description GET /images
 */
export const index = async (request, response, next) => {
  logger.info('GET /images');
  try {
    const imagesData = await getImages();
    const images = imagesData.map(imageData => {
      imageData.file = getFileUrl(request, imageData.file);
      imageData.thumb = getFileUrl(request, imageData.thumb);
      return imageData;
    });
    response.status(200).json(images);
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description GET /images/:id
 */
export const view = async (request, response, next) => {
  logger.info('GET /images/:id');
  try {
    const id = +request.params.id;
    const imageData = await getImage(id);
    imageData.file = getFileUrl(request, imageData.file);
    imageData.thumb = getFileUrl(request, imageData.thumb);
    response.status(200).json(imageData);
  } catch (error) {
    next(error);
  }
};

/**
 * 
 * @description POST /images
 */
export const create = async (request, response, next) => {
  logger.info('POST /photos');
  try {
    logger.info('File upload started');
    const companyId = +request.body.companyId;
    const { uploadedFileName, uploadedFileThumbName } = await loadImage(request.files.file[0]);
    const imageData = await createImage({ 
      name: uploadedFileName,
      file: uploadedFileName,
      thumb: uploadedFileThumbName,
      companyId,
    });
    imageData.file = getFileUrl(request, imageData.file);
    imageData.thumb = getFileUrl(request, imageData.thumb);
    response.status(201).json(imageData);
    logger.info('File upload successfully finished');
  } catch(error) {
    next(error);
  }
};

/**
 * 
 * @description DELETE /images/:id
 */
export const destroy = async (request, response, next) => {
  logger.info('POST /photos/:id');
  try {
    const id = +request.params.id;
    const imageData = await removeImage(id);
    response.status(200).json(imageData);
  } catch(error) {
    logger.error(error);
    next(error);
  }
};