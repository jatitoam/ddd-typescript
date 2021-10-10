import { IFieldDefinition } from "../../../src/Types/Entities/IFieldDefinition";
import { FieldValidator } from "../../../src/Utilities/Fields/FieldValidator";

describe("FieldValidator", () => {
  class MockFieldValidator<T> extends FieldValidator<T> {
    public getIndexedFields(): object {
      return super.getIndexedFields();
    }
  }

  const mockValidData = {
    number: 1,
    string: "abc",
    boolean: true,
    bigint: BigInt(1e10),
    symbol: Symbol("symbol"),
  };
  const mockInvalidExtraData = {
    number: 1,
    string: "abc",
    boolean: true,
    bigint: BigInt(1e10),
    symbol: Symbol("symbol"),
    other: "something",
  };
  const mockInvalidNumberData = { number: true };
  const mockInvalidStringData = { string: 1 };
  const mockInvalidBooleanData = { boolean: 1 };
  const mockInvalidBigintData = { bigint: 1 };
  const mockInvalidSymbolData = { symbol: 1 };
  const mockInvalidMissingData = { string: "abc", boolean: true };

  const mockFieldsDefinition: IFieldDefinition[] = [
    {
      name: "number",
      type: "number",
    },
    {
      name: "string",
      type: "string",
    },
    {
      name: "boolean",
      type: "boolean",
    },
    {
      name: "bigint",
      type: "bigint",
    },
    {
      name: "symbol",
      type: "symbol",
    },
  ];

  test("Indexes fields", () => {
    const e = new MockFieldValidator(mockFieldsDefinition, mockValidData);
    expect(e.getIndexedFields()).toStrictEqual({
      number: {
        name: "number",
        type: "number",
      },
      string: {
        name: "string",
        type: "string",
      },
      boolean: {
        name: "boolean",
        type: "boolean",
      },
      bigint: {
        name: "bigint",
        type: "bigint",
      },
      symbol: {
        name: "symbol",
        type: "symbol",
      },
    });
  });

  test("Field availability fails when they are not present according to the definition", () => {
    const e = new FieldValidator(mockFieldsDefinition, mockInvalidMissingData);
    expect(e.allFieldsAvailable()).toBe(false);
  });

  test("Field availability succeeds", () => {
    const e = new FieldValidator(mockFieldsDefinition, mockValidData);
    expect(e.allFieldsAvailable()).toBe(true);
  });

  test("Field type validation fails when expected", () => {
    const e1 = new FieldValidator(mockFieldsDefinition, mockInvalidNumberData);
    const e2 = new FieldValidator(mockFieldsDefinition, mockInvalidStringData);
    const e3 = new FieldValidator(mockFieldsDefinition, mockInvalidBooleanData);
    const e4 = new FieldValidator(mockFieldsDefinition, mockInvalidBigintData);
    const e5 = new FieldValidator(mockFieldsDefinition, mockInvalidSymbolData);
    expect(e1.allFieldsTypeMatch()).toBe(false);
    expect(e2.allFieldsTypeMatch()).toBe(false);
    expect(e3.allFieldsTypeMatch()).toBe(false);
    expect(e4.allFieldsTypeMatch()).toBe(false);
    expect(e5.allFieldsTypeMatch()).toBe(false);
  });

  test("Field type validation fails if not all fields are present and strict mode is set", () => {
    const e = new FieldValidator(mockFieldsDefinition, mockInvalidExtraData);
    expect(e.allFieldsTypeMatch(true)).toBe(false);
  });

  test("Field type validation succeeds", () => {
    const e1 = new FieldValidator(mockFieldsDefinition, mockInvalidExtraData);
    const e2 = new FieldValidator(mockFieldsDefinition, mockValidData);
    expect(e1.allFieldsTypeMatch(false)).toBe(true);
    expect(e2.allFieldsTypeMatch(false)).toBe(true);
  });
});
