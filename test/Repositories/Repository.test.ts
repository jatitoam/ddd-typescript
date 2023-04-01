import { Repository } from "../../src/Repositories/Repository";
import { UniqueEntityId } from "../../src/Utilities/Ids/UniqueEntityId";
import { IdNotFoundError } from "../../src/Errors/IdNotFoundError";

jest.mock("../../src/Utilities/Ids/UniqueEntityId");

describe("Repository", () => {
  beforeAll(() => {
    (UniqueEntityId as jest.MockedClass<any>)
      // Default implementation of UniqueEntityId has a number 1 as id
      .mockImplementation(() => {
        return {
          toString: jest.fn(() => {
            return "1";
          }),
        };
      });
  });

  const r = new Repository();
  const uid = new UniqueEntityId(1);

  test("Repository record not found - default behavior for parent repository class", () => {
    try {
      r.get(uid);
    } catch (e) {
      expect(e).toBeInstanceOf(IdNotFoundError);
    }
  });

  test("Repository record null - default behavior for parent repository class", () => {
    const record = r.findById(uid);
    expect(record).toBeNull();
  });
});
