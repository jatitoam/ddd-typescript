import { IFieldDefinition } from "Types/Entities/IFieldDefinition";

/**
 * Field validator class.  Using a generic type for data.
 */
export class FieldValidator<T> {
  private readonly fields: IFieldDefinition[];
  private readonly data: T;

  constructor(fields: IFieldDefinition[], data: T) {
    this.fields = fields;
    this.data = data;
  }

  /**
   * Indexes fields in an object using the field name as index
   *
   * @returns Object
   */
  protected getIndexedFields(): object {
    return this.fields.reduce((fieldsObject, field) => {
      fieldsObject[field.name] = field;
      return fieldsObject;
    }, {});
  }

  /**
   * Determines if all fields in data are available as in the definition
   *
   * @returns true|string[] true if it succeeds, otherwise the array of missing fields
   */
  public allFieldsAvailable(): true | string[] {
    const data = this.data;

    const missing = this.fields.reduce((missing, field) => {
      if (typeof data[field.name] === "undefined") missing.push(field.name);
      return missing;
    }, []);

    return missing.length === 0 ? true : missing;
  }

  /**
   * Determines if all given data matches the fields in the definition
   *
   * @param Boolean strict Determines if it should fail whether extra data is present according to the definition or not.
   * @returns true|IFieldDefinition[] true if all types are valid, otherwise an array of field definition of the fields that don't match
   */
  public allFieldsTypeMatch(
    strict: Boolean = false
  ): true | IFieldDefinition[] {
    const fields = this.getIndexedFields();
    const data = this.data;

    const invalid = Object.keys(data).reduce((invalid, field) => {
      if (
        (typeof fields[field] === "undefined" && strict) ||
        (typeof fields[field] !== "undefined" &&
          fields[field].type !== typeof data[field])
      )
        invalid.push(
          typeof fields[field] === "undefined"
            ? { name: field, type: "undefined" }
            : fields[field]
        );
      return invalid;
    }, []);

    return invalid.length === 0 ? true : invalid;
  }
}
