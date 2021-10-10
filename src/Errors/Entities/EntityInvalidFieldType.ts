import { GenericError } from "../GenericError";

export class EntityInvalidFieldType extends GenericError {
  code: number = 406;
  message: string = "Field %s in %s is not a %s";

  constructor(entity: string, field: string, type: string) {
    super();
    this.message = `Field ${field} in ${entity} is not a ${type}`;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
