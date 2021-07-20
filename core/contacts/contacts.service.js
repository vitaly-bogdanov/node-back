import Prisma from '@prisma/client';

const { PrismaClient } = Prisma;

const contact = new PrismaClient().contact;

export const getContacts = () => contact.findMany();

export const getContact = where => contact.findUnique({ where });

export const createContact = data => contact.create({ data });

export const updateContact = ({ where, data }) => contact.update({ where, data });

export const deleteContact = (where) => contact.delete({ where });