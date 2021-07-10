import { companiesService } from './companies.service.js';

class CompaniesController {

  constructor() { this.companiesService = companiesService; }
  
  index(request, response) {
    response.status(200).json({ message: 'Hello' });
  }

  view(request, response) {

  }

  create(request, response) {

  }

  update(request, response) {

  }

  destroy(request, response) {

  }

  #getCurrentUrl(request) {
    const { port } = config;
    return `${request.protocol}://${request.hostname}${port === '80' || port === '443' ? '' : `:${port}`}/`;
  }

};

export const companiesController = new CompaniesController();