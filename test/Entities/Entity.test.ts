import { Entity } from "../../src/Entities/Entity";
import { IEntityDefinition } from "../../src/Types/Entities/IEntityDefinition";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";

jest.mock("../../src/Utilities/Ids/UniqueEntityId");

describe("Entity", () => {
  const mockProps = {
    number: 1,
    string: "abc",
    boolean: true,
    other: "something",
  };
  const wrongMockProps = { number: true, string: 1, boolean: "abc" };
  const missingMockProps = { string: "abc", boolean: true };

  class MockEntity extends Entity<any> {
    protected readonly definition: IEntityDefinition = {
      required: [
        {
          name: "number",
          type: "Number",
        },
      ],
      optional: [
        {
          name: "string",
          type: "String",
        },
        {
          name: "boolean",
          type: "Boolean",
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
