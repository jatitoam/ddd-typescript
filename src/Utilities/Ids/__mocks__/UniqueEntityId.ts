/**
 * Mock for tests involving UniqueEntityId
 * It uses a simple numeric id with string representation.  Equals is always true
 */
export class UniqueEntityId {
  constructor(id?: string | number) {}

  public toValue() {
    return 1;
  }

  public toString() {
    return "1";
  }

  equals(id?: UniqueEntityId): boolean {
    return true;
  }
}
