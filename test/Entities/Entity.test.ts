import { Entity } from "../../src/Entities/Entity";
import { IEntityDefinition } from "../../src/Types/Entities/IEntityDefinition";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";

jest.mock("../../src/Utilities/Ids/UniqueEntityId");

describe("Entity", () => {
  const mockProps = {
    number: 1,
    string: "abc",
    boolean: true,
    bigint: 1e10,
    symbol: Symbol("symbol"),
    other: "something",
  };

  class MockEntity extends Entity<any> {
    protected readonly definition: IEntityDefinition = {
      required: [
        {
          name: "number",
          type: "number",
        },
      ],
      optional: [
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
      ],
    };
  }

  test("Entity can be successfully instantiated without id", () => {
    const e = new MockEntity(mockProps);
    expect(e).toBeInstanceOf(Entity);
  });

  test("Entity can be successfully instantiated with id", () => {
    const e = new MockEntity(mockProps, new UniqueEntityId());
    expect(e).toBeInstanceOf(Entity);
  });
});
