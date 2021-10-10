import { GenericError } from "../GenericError";

export class EntityInvalidFieldTypesError extends GenericError {
  code: number = 406;
  message: string = "Field(s) %s in %s are not the right type: %s";

  constructor(entity: string, fields: string[], types: string[]) {
    super();
    const plural = fields.length > 1 ? "s" : "";
    const verb = fields.length > 1 ? "are" : "is";
    const fieldList = fields.join(", ");
    const typeList = types.join(", ");
    this.message = `Field${plural} ${fieldList} in ${entity} ${verb} not the right type: ${typeList}`;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
