import { EntityInvalidFieldTypes } from "../Errors/Entities/EntityInvalidFieldTypes";
import { EntityRequiredFieldsNotFound } from "../Errors/Entities/EntityRequiredFieldsNotFound";
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
   * @throws EntityRequiredFieldsNotFound|EntityInvalidFieldTypes
   */
  constructor(props: T, id?: UniqueEntityId, validate: Boolean = true) {
    this._id = id ? id : new UniqueEntityId();
    this.props = props;

    if (validate) this.validate();
  }

  /**
   * Validates the entity
   *
   * @returns true
   * @throws EntityRequiredFieldsNotFound|EntityInvalidFieldTypes
   */
  protected validate(): true {
    // Validator for required fields
    const requiredValidation = new FieldValidator(
      this.definition.required,
      this.props
    );

    // Fails if required fields are not all present using the field validator
    const requiredFieldsValidation = requiredValidation.allFieldsAvailable();
    if (requiredFieldsValidation !== true)
      throw new EntityRequiredFieldsNotFound(
        (<any>this).constructor.name,
        requiredFieldsValidation
      );

    // Validator for optional fields
    const optionalValidation = new FieldValidator(
      this.definition.optional,
      this.props
    );

    const requiredFieldsTypeValidation =
      requiredValidation.allFieldsTypeMatch();
    const optionalFieldsTypeValidation =
      optionalValidation.allFieldsTypeMatch();

    if (
      requiredFieldsTypeValidation !== true ||
      optionalFieldsTypeValidation !== true
    ) {
      // If the validator fails, gets a joint array of the required and optional fields that have failed
      const invalidFields = (
        requiredFieldsTypeValidation === true
          ? []
          : requiredFieldsTypeValidation
      ).concat(
        optionalFieldsTypeValidation === true
          ? []
          : optionalFieldsTypeValidation
      );

      // Throws an exception with the joint array's names and types
      throw new EntityInvalidFieldTypes(
        <any>this.constructor.name,
        invalidFields.map((field) => {
          return field.name;
        }),
        invalidFields.map((field) => {
          return field.type;
        })
      );
    }

    // Everything fine, returns true
    return true;
  }
}
