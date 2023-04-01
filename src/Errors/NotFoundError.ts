import { GenericError } from "Errors/GenericError";

/**
 * Error not found error - generic
 */
export class NotFoundError extends GenericError {
  code = 404;
  message = "Not found";

  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
