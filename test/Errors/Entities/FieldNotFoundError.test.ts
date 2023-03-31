import { FieldNotFoundError } from "../../../src/Errors/Entities/FieldNotFoundError";

describe("FieldNotFoundError", () => {
  const e = new FieldNotFoundError("dummy");
  test("Exception properties are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e).toBeInstanceOf(FieldNotFoundError);
      expect(e.code).toBe(404);
      expect(e.name).toBe("FieldNotFoundError");
      expect(e.message).toBe("Field not found: dummy");
    }
  });
});
