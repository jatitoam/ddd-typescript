/**
 * String or id identifiers (T - type)
 *
 * Based on https://github.com/stemmlerjs/white-label/blob/master/src/core/domain/Identifier.ts
 */
export class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  public equals(id?: Identifier<T>): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    return id.toValue() === this.value;
  }

  /**
   * Return identifier in string
   *
   * @returns string
   */
  public toString(): string {
    return String(this.value);
  }

  /**
   * Return raw value of identifier
   *
   * @returns T
   */
  public toValue(): T {
    return this.value;
  }
}
