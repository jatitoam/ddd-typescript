import { NotFoundError } from "Errors/NotFoundError";

export class EntityRequiredFieldsNotFoundError extends NotFoundError {
  message: string = "Required field(s) %s was not found in %s";

  constructor(entity: string, fields: string[]) {
    super();
    const plural = fields.length > 1 ? "s" : "";
    const verb = fields.length > 1 ? "were" : "was";
    const fieldList = fields.join(", ");
    this.message = `Required field${plural} ${fieldList} ${verb} not found in ${entity}`;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
