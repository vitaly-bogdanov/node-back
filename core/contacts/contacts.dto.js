export class DataContactDto {

  lastname;
  firstname;
  patronymic;
  phone;
  email;

  constructor(data) {

    this.lastname = data.lastname;
    this.firstname = data.firstname;
    this.patronymic = data.patronymic;
    this.phone = data.phone
    this.email = data.email

  }
}