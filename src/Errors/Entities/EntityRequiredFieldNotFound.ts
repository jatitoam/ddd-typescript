import { NotFoundError } from "../NotFoundError";

export class EntityRequiredFieldNotFound extends NotFoundError {
  message: string = "Required field %s was not found in %s";

  constructor(entity: string, field: string) {
    super();
    this.message = `Required field ${field} was not found in ${entity}`;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
