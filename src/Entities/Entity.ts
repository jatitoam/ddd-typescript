import { EntityInvalidFieldTypesError } from "../Errors/Entities/EntityInvalidFieldTypesError";
import { EntityRequiredFieldsNotFoundError } from "../Errors/Entities/EntityRequiredFieldsNotFoundError";
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
   * @param IEntityDefinition definition Needed for each specific entity overriding this entity.  The child entity should not expose this parameter in its own constructor
   * @param UniqueEntityId id If not sent, it generates a UUID
   *
   * @throws EntityRequiredFieldsNotFoundError|EntityInvalidFieldTypesError
   */
  constructor(props: T, definition: IEntityDefinition, id?: UniqueEntityId) {
    this.props = props;
    this.definition = definition;
    this._id = id ? id : new UniqueEntityId();

    this.validate();
  }

  /**
   * Validates if the required fields are present.  It will fail if it's not the case
   *
   * @returns void
   */
  protected validateFieldsRequired(
    requiredValidation: FieldValidator<T>
  ): void {
    // Fails if required fields are not all present using the field validator
    const requiredFieldsValidation = requiredValidation.allFieldsAvailable();

    if (requiredFieldsValidation !== true)
      throw new EntityRequiredFieldsNotFoundError(
        (<any>this).constructor.name,
        requiredFieldsValidation
      );
  }

  /**
   * Validates if the required fields are present.  It will fail if it's not the case
   *
   * @returns void
   */
  protected validateFieldsMatchingTypes(
    requiredValidation: FieldValidator<T>,
    optionalValidation: FieldValidator<T>
  ) {
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
      throw new EntityInvalidFieldTypesError(
        <any>this.constructor.name,
        invalidFields.map((field) => {
          return field.name;
        }),
        invalidFields.map((field) => {
          return field.type;
        })
      );
    }
  }

  /**
   * Validates the entity
   *
   * @returns void
   * @throws EntityRequiredFieldsNotFoundError|EntityInvalidFieldTypesError
   */
  protected validate(): void {
    // Validator for required fields
    const requiredValidation = new FieldValidator(
      this.definition.required,
      this.props
    );

    // This will fail if fields are not present - leaving error throw
    this.validateFieldsRequired(requiredValidation);

    // Validator for optional fields
    const optionalValidation = new FieldValidator(
      this.definition.optional,
      this.props
    );

    // This will fail if any field is not matching type - leaving error throw
    this.validateFieldsMatchingTypes(requiredValidation, optionalValidation);
  }
}
