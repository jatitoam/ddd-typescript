import { IdNotFoundError } from "../../src/Errors/IdNotFoundError";

describe("NotFoundError", () => {
  const e = new IdNotFoundError("1");
  test("Exception properties are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e).toBeInstanceOf(IdNotFoundError);
      expect(e.code).toBe(404);
      expect(e.name).toBe("IdNotFoundError");
      expect(e.message).toBe("Id not found: 1");
    }
  });
});
