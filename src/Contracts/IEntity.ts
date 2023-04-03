/**
 * Entity contract
 */
export interface IEntity {
  /**
   * Name of the entity
   */
  readonly name: string;

  /**
   * Gets the id in its natural type
   *
   * @returns string|number
   */
  getId(): string | number;

  /**
   * Name getter
   *
   * @returns string
   */
  getName(): string;

  /**
   * Field getter
   *
   * @param field
   *
   * @throws FieldNotFoundError
   */
  get(field: string): any;

  /**
   * JSON serialization
   */
  serialize(): object;
}
