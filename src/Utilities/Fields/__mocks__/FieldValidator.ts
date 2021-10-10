export class FieldValidator<T> {
  constructor(fields: any, data: any) {}

  public allFieldsAvailable(): Boolean {
    return true;
  }

  public allFieldsTypeMatch(strict: Boolean = false): Boolean {
    return true;
  }
}
