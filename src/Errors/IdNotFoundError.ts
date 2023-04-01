import { NotFoundError } from "./NotFoundError";

/**
 * Error not found error - id
 */
export class IdNotFoundError extends NotFoundError {
  constructor(id: string) {
    super();
    this.message = "Id not found: " + id;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
