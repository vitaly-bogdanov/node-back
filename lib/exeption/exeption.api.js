export class ExeptionApi extends Error {

  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors; 
  }

  /**
   * 
   * @returns - Error 401
   */
  static UnauthorizedError() {
    return new ExeptionApi(401, 'Пользователь не авторизован');
  }

  /**
   * 
   * @param {string} message 
   * @param {array} errors 
   * @returns - Error 400
   */
  static BadRequest(message, errors = []) {
    return new ExeptionApi(400, message, errors);
  }

}