import { getContacts, getContact, createContact, updateContact, deleteContact } from './contacts.service.js';
import { DataContactDto } from './contacts.dto.js';
import { initLogger } from '../../main/logger/index.js';

const logger = initLogger(import.meta.url);

/**
 * 
 * @description GET /contacts
 */
export const index = async (request, response, next) => {
  logger.info('get contacts');
  try {
    const contacts = await getContacts();
    response.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @description GET /contacts/:id
 */
export const view = async (request, response, next) => {
  logger.info('get contact');
  try {
    const { id } = request.params;
    const contact = await getContact({ id: Number(id) });
    response.status(200).json(contact); 
  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @description POST /contacts
 */
export const create = async (request, response, next) => {
  logger.info('create contact');
  try {
    const dataContact = new DataContactDto(request.body);
    const contact = await createContact({ ...dataContact });
    logger.info('created contact');
    response.status(201).json(contact);
  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @description PUT /contacts
 */
export const update = async (request, response, next) => {
  logger.info('update contact');
  try {
    const { id } = request.params;
    const dataContactDto = new DataContactDto(request.body);
    const contact = await updateContact({ id: Number(id) }, { ...dataContactDto });
    logger.info('updated contact');
    response.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @description DELETE /contacts
 */
export const destroy = async (request, response, next) => {
  logger.info('delete contact');
  try {
    const id = +request.params.id;
    const contact = await deleteContact({ id });
    logger.info('deleted contact');
    response.status(200).json(contact);
  } catch (error) {
    next(error);
  }
}