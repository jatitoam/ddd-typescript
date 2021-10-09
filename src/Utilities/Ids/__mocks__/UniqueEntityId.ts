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
