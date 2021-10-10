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
   */
  public allFieldsAvailable(): Boolean {
    const data = this.data;

    return this.fields.reduce((allExisting, field) => {
      return allExisting && typeof data[field.name] !== "undefined";
    }, true);
  }

  /**
   *
   * @param Boolean strict Determines if it should fail whether extra data is present according to the definition or not.
   * @returns
   */
  public allFieldsTypeMatch(strict: Boolean = false): Boolean {
    const fields = this.getIndexedFields();
    const data = this.data;

    return Object.keys(data).reduce((allValid, field) => {
      return (
        allValid &&
        ((typeof fields[field] !== "undefined" &&
          fields[field].type === typeof data[field]) ||
          (typeof fields[field] === "undefined" && !strict))
      );
    }, true);
  }
}
