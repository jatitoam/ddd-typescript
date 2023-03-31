import { Entity } from "../../src/Entities/Entity";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";
import { FieldNotFoundError } from "../../src/Errors/Entities/FieldNotFoundError";

jest.mock("../../src/Utilities/Ids/UniqueEntityId");

describe("Entity", () => {
  type mockType = {
    dummyInt: Number;
    dummyString?: String;
  };

  const mockProps = {
    dummyInt: 1,
    dummyString: "x",
  };

  function mockReturnTrue(): true {
    return true;
  }

  class MockEntity extends Entity<mockType> {
    constructor(props: mockType, id?: UniqueEntityId) {
      super(props, id);
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

    eg = new MockEntity(mockProps);
  });

  beforeEach(() => {
    (UniqueEntityId as jest.MockedClass<any>).mockClear();
  });

  test("Entity can be successfully instantiated without id", () => {
    expect(eg).toBeInstanceOf(Entity);
  });

  test("Entity can be successfully instantiated with id", () => {
    const e = new MockEntity(mockProps, new UniqueEntityId());
    expect(e).toBeInstanceOf(Entity);
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

  test("Exception found when an unexisting field is tried to be get", () => {
    try {
      eg.get("non-existing");
    } catch (e) {
      expect(e).toBeInstanceOf(FieldNotFoundError);
    }
  });

  test("Field is found when getting it", () => {
    const i = eg.get("dummyInt");
    expect(i).toBe(1);
  });
});
