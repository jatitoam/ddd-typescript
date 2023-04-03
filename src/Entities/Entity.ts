import { IEntity } from "Contracts/IEntity";
import { FieldNotFoundError } from "Errors/Entities/FieldNotFoundError";
import { IdValue } from "Types/IdValue";
import { UniqueEntityId } from "Utilities/Ids/UniqueEntityId";

/**
 * Abstract Entity class
 */
export abstract class Entity<T> implements IEntity {
  /**
   * Id of the entity
   */
  protected readonly _id: UniqueEntityId;

  /**
   * Collection of properties
   */
  protected readonly props: T;

  /**
   * Name of the entity
   */
  public readonly name: string = "Entity";

  /**
   * @param T props
   * @param IEntityDefinition definition Needed for each specific entity overriding this entity.  The child entity should not expose this parameter in its own constructor
   * @param UniqueEntityId id If not sent, it generates a UUID
   */
  constructor(props: T, id?: UniqueEntityId) {
    this.props = props;
    this._id =
      typeof props["id"] !== "undefined" && props["id"] !== null
        ? new UniqueEntityId(props["id"])
        : id
        ? id
        : new UniqueEntityId();
  }

  /**
   * Gets the id in its natural type
   *
   * @returns IdValue
   */
  public getId(): IdValue {
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

  /**
   * Name getter
   *
   * @returns string
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Field getter
   *
   * @param field
   *
   * @throws FieldNotFoundError
   */
  public get(field: string): any {
    if (typeof this.props[field] === "undefined") {
      throw new FieldNotFoundError(field);
    }

    return this.props[field];
  }

  /**
   * Serialize the entity as a JSON
   *
   * @returns object
   */
  public serialize(): object {
    return {
      id: this._id.toValue(),
      ...this.props,
    };
  }
}
