import { UniqueEntityId } from "Utilities/Ids/UniqueEntityId";

/**
 * Abstract Entity class
 */
export abstract class Entity<T> {
  /**
   * Id of the entity
   */
  protected readonly _id: UniqueEntityId;

  /**
   * Collection of properties
   */
  protected readonly props: T;

  /**
   * @param T props
   * @param IEntityDefinition definition Needed for each specific entity overriding this entity.  The child entity should not expose this parameter in its own constructor
   * @param UniqueEntityId id If not sent, it generates a UUID
   */
  constructor(props: T, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ? id : new UniqueEntityId();
  }

  /**
   * Gets the id in its natural type
   *
   * @returns string|number
   */
  public getId(): string | number {
    return this._id.toValue();
  }

  /**
   * Gets the id stringified
   *
   * @returns string
   */
  public getIdString(): string {
    return this._id.toString();
  }
}
