import { InvalidArgumentError } from "Errors/InvalidArgumentError";
import { SortDirection } from "Types/SortDirection";

/**
 * Sorting Information class.
 *
 * This class is used when the sorting information about a paginated collection is also required.
 */
export class SortInfo {
  /**
   * Ordering field's key.
   */
  protected field = "";

  /**
   * Default field used for ordering.
   */
  protected defaultField = "";

  /**
   * Ordering direction: asc/desc
   */
  protected direction: SortDirection = "asc";

  /**
   * Creates a new Sorting Information instance.
   *
   * @param field Field used in the record ordering
   * @param defaultField Default field used for ordering
   * @param direction Ordering direction (asc / desc)
   */
  constructor(
    field: string,
    defaultField: string,
    direction: SortDirection = "asc"
  ) {
    if (!field.trim().length || !defaultField.trim().length) {
      throw new InvalidArgumentError("The sort criteria must have values");
    }

    this.field = field.trim().toLowerCase();
    this.defaultField = defaultField.trim().toLowerCase();
    this.direction = direction;
  }

  /**
   * Returns the String representation of the object.
   */
  public toString(): string {
    return "orderby=" + this.field + "&orderdir=" + this.direction;
  }

  /**
   * Returns an array containing all its item's serialized data.
   */
  public serialize(): object {
    return {
      field: this.field,
      defaultField: this.defaultField,
      direction: this.direction,
    };
  }

  /**
   * Returns the ordering Field.
   * @returns string
   */
  public getField(): string {
    return this.field;
  }

  /**
   * Returns the direction of the ordering
   * @returns SortDirection (asc | desc)
   */
  public getDirection(): SortDirection {
    return this.direction;
  }
}
