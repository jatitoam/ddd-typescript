import { Entity } from "../../src/Entities/Entity";
import { IEntityDefinition } from "../../src/Types/Entities/IEntityDefinition";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";
import { FieldValidator } from "../../src/Utilities/Fields/FieldValidator";

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
          name: "number",
          type: "number",
        },
      ],
      optional: [],
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
