import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

const user = new PrismaClient().user;

export const createUserService = async ({ name, password }) => user.create({ data: { name, password }, select: { id: true, name: true } });

export const findUserService = async (where) => user.findUnique({ where, select: { id: true, name: true } });

export const getUserWithHashPassword = async (where) => user.findUnique({ where, select: { id: true, name: true, password: true } });