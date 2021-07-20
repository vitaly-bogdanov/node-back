export class UserDto {
  
  name;
  password;

  constructor(data) {
    this.name = data.name;
    this.password = data.password;
  }
  
}