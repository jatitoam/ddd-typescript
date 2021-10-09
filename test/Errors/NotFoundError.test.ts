import { NotFoundError } from "../../src/Errors/NotFoundError";

describe("NotFoundError", () => {
  const e = new NotFoundError();
  test("Exception properties are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundError);
      expect(e.code).toBe(404);
      expect(e.name).toBe("NotFoundError");
      expect(e.message).toBe("Not found");
    }
  });
});
