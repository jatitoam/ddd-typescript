import { IEntityDefinition } from "../Types/Entities/IEntityDefinition";
import { FieldValidator } from "../Utilities/Fields/FieldValidator";
import { UniqueEntityId } from "../Utilities/Ids/UniqueEntityId";

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
   * Definition of required and optional fields of the entity, for validation
   * Read-only and immutable class property so it has to be defined during inheritance
   */
  protected readonly definition: IEntityDefinition = {
    required: [],
    optional: [],
  };

  /**
   * @param T props
   * @param UniqueEntityId id If not sent, it generates a UUID
   */
  constructor(props: T, id?: UniqueEntityId) {
    this._id = id ? id : new UniqueEntityId();
    this.props = props;
  }
}
