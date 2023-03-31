import { NotFoundError } from "Errors/NotFoundError";

export class FieldNotFoundError extends NotFoundError {
  constructor(field: string) {
    super();
    this.message = "Field not found: " + field;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
