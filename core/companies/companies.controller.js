import { 
  getCompanies, 
  getCompany, 
  createCompany, 
  updateCompany, 
  deleteCompany 
} from './companies.service.js';
import { 
  IndexCompaniesDto, 
  DataCompaniesDto 
} from './companies.dto.js';
import { 
  initLogger 
} from '../../main/logger/index.js';

const logger = initLogger(import.meta.url);

/**
 * 
 * @description GET /companies?take=2&step=3&image=get
 */
export const index = async (request, response, next) => {
  logger.info('get companies');
  try {
    const indexCompaniesDto = new IndexCompaniesDto(request.query);
    const companies = await getCompanies({ 
      where: { 
        type: indexCompaniesDto.type, 
        status: indexCompaniesDto.status, 
        // createdAt: { gte: indexCompaniesDto.gte, lt: indexCompaniesDto.lt } 
      }, 
      step: indexCompaniesDto.step, 
      take: indexCompaniesDto.take,
      include: { 
        image: indexCompaniesDto.image,
        address: indexCompaniesDto.address 
      }
    });
    response.status(200).json(companies);
  } catch(error) {
    next(error);
  } 
}

/**
 * 
 * @description GET /companies/:id
 */
export const view = async (request, response, next) => {
  logger.info(`get company by id`);
  try {
    const id = +request.params.id;
    const company = await getCompany({ id });
    response.status(200).json(company); 
  } catch (error) {
    next(error);
  } 
}

/**
 * 
 * @description POST /companies
 */
export const create = async (request, response, next) => {
  logger.info('create company');
  try {
    const dataCompaniesDto = new DataCompaniesDto(request.body);
    const company = await createCompany({ ...dataCompaniesDto });
    logger.info('company created');
    response.status(201).json(company);
  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @description PUT /companies
 */
export const update = async (request, response, next) => {
  logger.info('update company');
  try {
    const id = +request.params.id;
    const dataCompaniesDto = new DataCompaniesDto(request.body);
    const company = await updateCompany({ where: { id }, data: { ...dataCompaniesDto } });
    logger.info('updated company');
    response.status(200).json(company);
  } catch (error) {
    next(error);
  }
}

/**
 * 
 * @description DELETE /companies
 */
export const destroy = async (request, response, next) => {
  logger.info(`delete company`);
  try {
    const id = +request.params.id;
    const company = await deleteCompany({ id });
    logger.info(`company deleted`);
    response.status(200).json(company);
  } catch (error) {
    next(error);
  }
}