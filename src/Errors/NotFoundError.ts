import { GenericError } from "Errors/GenericError";

/**
 * Error not found error - generic
 */
export class NotFoundError extends GenericError {
  code: number = 404;
  message: string = "Not found";

  constructor() {
    super();
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
