class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
  static badRequest(msg) {
    return new ApiError(400, msg);
  }

  static duplicatedField(msg) {
    return new ApiError(409, msg);
  }

  static invalidData(msg) {
    return new ApiError(422, msg);
  }
}

module.exports = ApiError;
