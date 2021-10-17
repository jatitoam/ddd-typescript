import { Entity } from "../../src/Entities/Entity";
import { IEntityDefinition } from "../../src/Types/Entities/IEntityDefinition";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";
import { EntityRequiredFieldsNotFoundError } from "../../src/Errors/Entities/EntityRequiredFieldsNotFoundError";
import { IFieldDefinition } from "../../src/Types/Entities/IFieldDefinition";
import { FieldValidator } from "../../src/Utilities/Fields/FieldValidator";
import { EntityInvalidFieldTypesError } from "../../src/Errors/Entities/EntityInvalidFieldTypesError";

jest.mock("../../src/Utilities/Ids/UniqueEntityId");
jest.mock("../../src/Utilities/Fields/FieldValidator");

describe("Entity", () => {
  const mockProps = {
    required: 1,
  };

  const mockDefinition: IEntityDefinition = {
    required: [
      {
        name: "dummy",
        type: "number",
      },
    ],
    optional: [
      {
        name: "optional",
        type: "number",
      },
    ],
  };

  function mockReturnTrue(): true {
    return true;
  }
  function mockReturnMissingField(): string[] {
    return ["dummy"];
  }
  function mockReturnInvalidField(): IFieldDefinition[] {
    return [{ name: "dummy", type: "number" }];
  }

  class MockEntity extends Entity<any> {
    constructor(props: any, id?: UniqueEntityId) {
      super(props, mockDefinition, id);
    }

    public validateFieldsRequired(
      requiredValidation: FieldValidator<any>
    ): void {
      super.validateFieldsRequired(requiredValidation);
    }

    public validateFieldsMatchingTypes(
      requiredValidation: FieldValidator<any>,
      optionalValidation: FieldValidator<any>
    ) {
      super.validateFieldsMatchingTypes(requiredValidation, optionalValidation);
    }

    public validate(): void {
      super.validate();
    }

    public get_Id(): UniqueEntityId {
      return this._id;
    }
  }

  let eg: MockEntity;

  // Sets up the global valid entity and mocks
  beforeAll(() => {
    (UniqueEntityId as jest.MockedClass<any>)
      // Default implementation of UniqueEntityId has a number 1 as id
      .mockImplementation(() => {
        return {
          toValue: jest.fn(() => {
            return 1;
          }),
          toString: jest.fn(() => {
            return "1";
          }),
        };
      });

    (FieldValidator as jest.MockedClass<any>)
      // Default implementation of FieldValidator succeeds inconditionally
      .mockImplementation(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnTrue),
        };
      });

    eg = new MockEntity(mockProps);
  });

  beforeEach(() => {
    (UniqueEntityId as jest.MockedClass<any>).mockClear();
    (FieldValidator as jest.MockedClass<any>).mockClear();
  });

  test("Entity can be successfully instantiated without id", () => {
    expect(eg).toBeInstanceOf(Entity);
  });

  // Missing required fields returned by the validator
  test("Entity validation breaks when the validator shows missing required fields", () => {
    (FieldValidator as jest.MockedClass<any>)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnMissingField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnMissingField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnMissingField),
        };
      });

    // validateFieldsRequired function
    try {
      eg.validateFieldsRequired(
        new FieldValidator(mockDefinition.required, mockProps)
      );
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityRequiredFieldsNotFoundError);
    }

    // validate function
    try {
      eg.validate();
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityRequiredFieldsNotFoundError);
    }

    // constructor
    try {
      const ef = new MockEntity(mockProps);
    } catch (e) {
      expect(e).toBeInstanceOf(EntityRequiredFieldsNotFoundError);
    }
  });

  // Using default implementation for required fields validation - validator returns true using the default implementation in the beforeAll event
  test("Required field validation succeeds", () => {
    eg.validateFieldsRequired(
      new FieldValidator(mockDefinition.required, mockProps)
    );
    expect(eg).toBeInstanceOf(Entity);
  });

  // Non-matching types in required and optional fields returned by the validator (two passes break)
  test("Required and optional validation fail when the validator does", () => {
    (FieldValidator as jest.MockedClass<any>)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      });

    // validateFieldsMatchingTypes function
    try {
      eg.validateFieldsMatchingTypes(
        new FieldValidator(mockDefinition.required, mockProps),
        new FieldValidator(mockDefinition.optional, mockProps)
      );
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }

    // validate function
    try {
      eg.validate();
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }

    // constructor
    try {
      const ef = new MockEntity(mockProps);
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }
  });

  // Non-matching types in required fields returned by the validator (first pass breaks)
  test("Required field validation fails when the validator does", () => {
    (FieldValidator as jest.MockedClass<any>)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnTrue),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnTrue),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnTrue),
        };
      });

    // validateFieldsMatchingTypes function
    try {
      eg.validateFieldsMatchingTypes(
        new FieldValidator(mockDefinition.required, mockProps),
        new FieldValidator(mockDefinition.optional, mockProps)
      );
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }

    // validate function
    try {
      eg.validate();
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }

    // constructor
    try {
      const ef = new MockEntity(mockProps);
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }
  });

  // Non-matching types in optional fields returned by the validator (second pass breaks)
  test("Optional field validation fails when the validator does", () => {
    (FieldValidator as jest.MockedClass<any>)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnTrue),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnTrue),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnTrue),
        };
      })
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(mockReturnTrue),
          allFieldsTypeMatch: jest.fn(mockReturnInvalidField),
        };
      });

    // validateFieldsMatchingTypes function
    try {
      eg.validateFieldsMatchingTypes(
        new FieldValidator(mockDefinition.required, mockProps),
        new FieldValidator(mockDefinition.optional, mockProps)
      );
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }

    // validate function
    try {
      eg.validate();
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }

    // constructor
    try {
      const ef = new MockEntity(mockProps);
      throw new Error();
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypesError);
    }
  });

  // Matching fields returned by the validator - using default implementation of the validator in beforeAll event
  test("Field validation succeeds", () => {
    eg.validateFieldsMatchingTypes(
      new FieldValidator(mockDefinition.required, mockProps),
      new FieldValidator(mockDefinition.optional, mockProps)
    );
    expect(eg).toBeInstanceOf(Entity);
  });

  test("Entity can be successfully instantiated with id", () => {
    const e = new MockEntity(mockProps, new UniqueEntityId());
    expect(e).toBeInstanceOf(Entity);
  });

  test("Entity validation succeeds", () => {
    eg.validate();
    expect(eg).toBeInstanceOf(Entity);
  });

  test("Getting the id in its natural type succeeds", () => {
    const id = eg.getId();
    expect(id).toBe(1);
    expect(eg.get_Id().toValue).toHaveBeenCalledTimes(1);
  });

  test("Getting the stringified id succeeds", () => {
    const id = eg.getIdString();
    expect(id).toBe("1");
    expect(eg.get_Id().toString).toHaveBeenCalledTimes(1);
  });
});
