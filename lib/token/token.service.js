import Prisma from '@prisma/client';
import jsonWebToken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { PrismaClient } = Prisma;

const token = new PrismaClient().token;

export const generateTokensPareService = (payload) => ({
  accessToken: jsonWebToken.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, { expiresIn: '30m' }),
  refreshToken: jsonWebToken.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '30d' })
});

export const createRefreshTokenService = async (userId, refreshToken) => token.create({ data: { userId, refreshToken } });

export const updateRefreshTokenService = async (userId, refreshToken) => token.update({ where: { userId }, data: { refreshToken } }); 

export const removeTokenService = (refreshToken) => token.delete({ where: { refreshToken } });

export const validateAccessTokenService = token => {
  try {
    const userData = jsonWebToken.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
}

export const validateRefreshTokenService = token => {
  try {
    const userData = jsonWebToken.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
    return userData;
  } catch (error) {
    return null;
  }
}

export const findTokenService = async refreshToken => token.findUnique({ where: { refreshToken } });