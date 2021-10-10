import { Entity } from "../../src/Entities/Entity";
import { IEntityDefinition } from "../../src/Types/Entities/IEntityDefinition";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";

jest.mock("../../src/Utilities/Ids/UniqueEntityId");

describe("Entity", () => {
  const mockProps = {
    required: 1,
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

    public validate(): void {
      super.validate();
    }
  }

  let eg: MockEntity;

  // Sets up the global valid entity and mocks
  beforeAll(() => {
    eg = new MockEntity(mockProps);
  });

  test("Entity can be successfully instantiated without id", () => {
    expect(eg).toBeInstanceOf(Entity);
  });

  test("Entity can be successfully instantiated with id", () => {
    const e = new MockEntity(mockProps, new UniqueEntityId());
    expect(e).toBeInstanceOf(Entity);
  });
});
