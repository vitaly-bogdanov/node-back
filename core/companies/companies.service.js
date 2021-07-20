import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

const company = new PrismaClient().company;

export const getCompanies = ({ where, step, take, image, address }) => 
  step && take 
    ? company.findMany({ where, skip: step * take, take, include: { image, address } }) 
    : company.findMany({ where, include: { image, address } });

export const getCompany = where => company.findUnique({ where });

export const createCompany = data => company.create({ data });

export const updateCompany = ({ where, data }) => company.update({ where, data });

export const deleteCompany = (where) => company.delete({ where });