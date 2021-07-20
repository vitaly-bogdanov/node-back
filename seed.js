import Prisma from '@prisma/client';
import faker from 'faker';

import { TYPE, BUSINESS_ENTITY, STATUS } from './core/companies/index.js';

const { PrismaClient } = Prisma;

faker.locale = 'ru';

const prisma = new PrismaClient();

const contacts0 = [ ...Array(10).keys() ].map(() => ({
  lastname: faker.name.firstName(),
  firstname: faker.name.lastName(),
  patronymic: faker.name.firstName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  companies: { 
    create:  [ ...Array(2).keys() ].map(() => ({ 
      name: faker.company.companyName(), 
      shortName: faker.company.companySuffix(),
      businessEntity: BUSINESS_ENTITY.OAO,
      type: TYPE.AGENT,
      status: STATUS.ACTIVE,
      createdAt: faker.date.past(),
      contract: { create: { issueDate: faker.date.past() } },
      address: { 
        create: { 
          zipCode: faker.address.zipCode(), 
          country: faker.address.country(), 
          cityName: faker.address.cityName(),
          streetAddress: faker.address.streetAddress()
        } 
      }
    }))
  }
}));

const contacts1 = [ ...Array(10).keys() ].map(() => ({
  lastname: faker.name.firstName(),
  firstname: faker.name.lastName(),
  patronymic: faker.name.firstName(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  companies: { 
    create: [ ...Array(2).keys() ].map(() => ({ 
      name: faker.company.companyName(), 
      shortName: faker.company.companySuffix(),
      businessEntity: BUSINESS_ENTITY.OOO,
      type: TYPE.CONSTRACTOR,
      status: STATUS.INACTIVE,
      createdAt: faker.date.past(),
      contract: { create: { issueDate: faker.date.past() } },
      address: { 
        create: { 
          zipCode: faker.address.zipCode(), 
          country: faker.address.country(), 
          cityName: faker.address.cityName(),
          streetAddress: faker.address.streetAddress()
        } 
      }
    }))
  }
}));

(async () => {
  const contacts = [...contacts0, ...contacts1];
  for (let contact of contacts) {
    await prisma.contact.create({ data: contact  });
  }
})()
  .catch((e) => console.log(e))
  .finally(() => prisma.$disconnect());