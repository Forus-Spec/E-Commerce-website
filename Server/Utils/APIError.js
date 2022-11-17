import {
  BAD_REQUEST,
  NOT_FOUND,
  FORBIDDEN,
  UNAUTHORIZED
} from "./statusCodes.js";

export class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

export class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

export class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND;
  }
}

export class Forbidden extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}
