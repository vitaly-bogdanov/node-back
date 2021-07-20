import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import Prisma from '@prisma/client';
import jimp from 'jimp';
import dotenv from 'dotenv';

import { THUMB_SIZE, IMAGES_DIR } from './images.constant.js';

dotenv.config();
const { PrismaClient } = Prisma;

const prisma = new PrismaClient();

export const loadImage = async file => {
  const fileExtention = path.extname(file.originalname).toLowerCase();
  const fileName = crypto.randomBytes(10).toString('hex');
  const uploadedFileName = fileName + fileExtention;
  const uploadedFileThumbName = `${fileName}_${THUMB_SIZE}x${THUMB_SIZE}${fileExtention}`;
  const tempFilePath = file.path;
  const targetFilePath = path.resolve(`${IMAGES_DIR}/${uploadedFileName}`);
  const targetThumbPath = path.resolve(`${IMAGES_DIR}/${uploadedFileThumbName}`); 
  await resize(tempFilePath, targetThumbPath)
    .catch(error => { throw error });
  await rename(tempFilePath, targetFilePath)
    .catch(error => { throw error });
  return { uploadedFileName, uploadedFileThumbName };
}

export const createImage = async ({ name, file,  thumb, companyId }) => {
  return prisma.image.create({ data: { name, file, thumb, companyId } });
}

export const getFileUrl = (request, fileName) => {
  const url = `${request.protocol}://${request.hostname}${process.env.PORT === '80' || process.env.PORT === '443' ? '' : `:${process.env.PORT}`}`;
  return `${url}/images/${fileName}`;
}

export const getImage = async (id) => prisma.image.findUnique({ where: { id } });

export const getImages = async () => prisma.image.findMany();

export const removeImage = async (id) => {
  const imageData = await prisma.image.delete({ where: { id } });
  await remove(path.resolve(`${IMAGES_DIR}/${imageData.file}`))
    .catch(error => { throw error });
  await remove(path.resolve(`${IMAGES_DIR}/${imageData.thumb}`))
    .catch(error => { throw error });
  return imageData;
}

export const resize = async (file, filePath) => {
  const image = await jimp.read(file);
  await image.resize(jimp.AUTO, 180);
  const w = image.bitmap.width;
  const h = image.bitmap.height;
  await image.crop((w - THUMB_SIZE) / 2, (h - THUMB_SIZE) / 2, THUMB_SIZE, THUMB_SIZE);
  await image.writeAsync(filePath);
}

export const remove = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

export const rename = (temp, target) => {
  return new Promise((resolve, reject) => {
    fs.rename(temp, target, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}