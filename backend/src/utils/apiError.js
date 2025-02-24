class APIError extends Error {
  constructor(msg, status) {
    super(msg);
    this.status = status;
  }

  static ResourceNotFound(msg = "Resource not Found", status = 404) {
    return new this(msg, status);
  }

  static BadRequest(msg = "Invalid Request", status = 400) {
    return new this(msg, status);
  }

  static Unauthorized(msg, status = 401) {
    const message = msg || "You don't have the required permission";
    return new this(message, status);
  }

  static Unauthenticated(msg, status = 407) {
    const message = msg || "You need to login first in order to have access.";
    return new this(message, status);
  }

  static Conflict(msg, status = 409) {
    const message = msg || "Conflict occurred.";
    return new this(message, status);
  }

  static Forbidden(msg, status = 403) {
    const message = msg || "Forbidden.";
    return new this(message, status);
  }

  static ServerError(msg, status = 500) {
    const message = msg || "Internal Server Error.";
    return new this(message, status);
  }

  static CustomError(msg = "Unknown Error", status = 405) {
    return new this(msg, status);
  }
}

export default APIError;
