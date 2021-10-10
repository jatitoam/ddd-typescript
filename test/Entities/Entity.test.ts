import { Entity } from "../../src/Entities/Entity";
import { IEntityDefinition } from "../../src/Types/Entities/IEntityDefinition";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";
import { FieldValidator } from "../../src/Utilities/Fields/FieldValidator";
import { EntityRequiredFieldsNotFoundError } from "../../src/Errors/Entities/EntityRequiredFieldsNotFoundError";
import { IFieldDefinition } from "../../src/Types/Entities/IFieldDefinition";
import { EntityInvalidFieldTypesError } from "../../src/Errors/Entities/EntityInvalidFieldTypesError";

jest.mock("../../src/Utilities/Ids/UniqueEntityId");
jest.mock("../../src/Utilities/Fields/FieldValidator");

describe("Entity", () => {
  const mockProps = {
    number: 1,
  };

  class MockEntity extends Entity<any> {
    protected readonly definition: IEntityDefinition = {
      required: [
        {
          name: "required",
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

    public validate(): true {
      return super.validate();
    }
  }

  beforeAll(() => {
    function returnTrue(): true {
      return true;
    }
    function returnMissingField(): string[] {
      return ["number"];
    }
    function returnInvalidField(): IFieldDefinition[] {
      return [{ name: "number", type: "number" }];
    }
    (FieldValidator as jest.MockedClass<any>)
      // Validation fails because of missing required fields
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(returnMissingField),
        };
      })
      // Validation fails because of invalid field types in both required and optional definitions - 1st pass (required fields)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(returnTrue),
          allFieldsTypeMatch: jest.fn(returnInvalidField),
        };
      })
      // Validation fails because of invalid field types in both required and optional definitions - 2nd pass (optional fields)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(returnTrue),
          allFieldsTypeMatch: jest.fn(returnInvalidField),
        };
      })
      // Validation fails because of invalid field types in required fields only - 1st pass (required fields)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(returnTrue),
          allFieldsTypeMatch: jest.fn(returnInvalidField),
        };
      })
      // Validation fails because of invalid field types in required fields only - 2nd pass (optional fields)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(returnTrue),
          allFieldsTypeMatch: jest.fn(returnTrue),
        };
      })
      // Validation fails because of invalid field types in optional fields only - 1st pass (required fields)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(returnTrue),
          allFieldsTypeMatch: jest.fn(returnTrue),
        };
      })
      // Validation fails because of invalid field types in optional fields only - 2nd pass (optional fields)
      .mockImplementationOnce(() => {
        return {
          allFieldsAvailable: jest.fn(returnTrue),
          allFieldsTypeMatch: jest.fn(returnInvalidField),
        };
      })
      // Validation succeeds
      .mockImplementation(() => {
        return {
          allFieldsAvailable: jest.fn(returnTrue),
          allFieldsTypeMatch: jest.fn(returnTrue),
        };
      });
  });

  test("Entity can be successfully instantiated without id", () => {
    const e = new MockEntity(mockProps, undefined, false);
    expect(e).toBeInstanceOf(Entity);
  });

  test("Entity can be successfully instantiated with id", () => {
    const e = new MockEntity(mockProps, new UniqueEntityId(), false);
    expect(e).toBeInstanceOf(Entity);
  });

  test("Validation fails because of missing required fields", () => {
    const e = new MockEntity(mockProps, undefined, false);
    try {
      e.validate();
      throw new Error();
    } catch (err) {
      expect(err).toBeInstanceOf(EntityRequiredFieldsNotFoundError);
    }
  });

  test("Validation fails because of invalid field types in both required and optional definitions", () => {
    const e = new MockEntity(mockProps, undefined, false);
    try {
      e.validate();
      throw new Error();
    } catch (err) {
      expect(err).toBeInstanceOf(EntityInvalidFieldTypesError);
    }
  });

  test("Validation fails because of invalid field types in required fields only", () => {
    const e = new MockEntity(mockProps, undefined, false);
    try {
      e.validate();
      throw new Error();
    } catch (err) {
      expect(err).toBeInstanceOf(EntityInvalidFieldTypesError);
    }
  });

  test("Validation fails because of invalid field types in optional fields only", () => {
    const e = new MockEntity(mockProps, undefined, false);
    try {
      e.validate();
      throw new Error();
    } catch (err) {
      expect(err).toBeInstanceOf(EntityInvalidFieldTypesError);
    }
  });

  test("Validation succeeds", () => {
    const e = new MockEntity(mockProps, undefined, false);
    expect(e.validate()).toBe(true);
  });

  // This test is at the end so the field validation mock is using the default implementation (all good - true)
  test("Builds with successful validation", () => {
    const e = new MockEntity(mockProps);
    expect(e).toBeInstanceOf(Entity);
  });
});
