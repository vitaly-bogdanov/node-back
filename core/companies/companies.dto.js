export class IndexCompaniesDto {

  step;
  take; 
  type; 
  status;
  image;

  constructor(data) {
    this.step = Number(data.step);
    this.take = Number(data.take);
    this.type = data.type;
    this.status = data.type;
    this.image = data?.image === 'get' || false;
    this.address = data?.address === 'get' || false;
    this.gte = new Date(data.gte) == 'Invalid Date' ? undefined : new Date(data.gte);
    this.lt = new Date(data.lt) == 'Invalid Date' ? undefined : new Date(data.lt)
  }

}

export class DataCompaniesDto {

  name;
  shortName;
  businessEntity;
  type;
  status;

  constructor(data) {
    this.name = data.name;
    this.shortName = data.shortName;
    this.businessEntity = data.businessEntity
    this.type = data.type;
    this.status = data.status;
    this.contactId = data.contactId;
  }

}