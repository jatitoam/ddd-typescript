import { EntityRequiredFieldNotFound } from "../../../src/Errors/Entities/EntityRequiredFieldNotFound";

describe("EntityRequiredFieldNotFound", () => {
  const e = new EntityRequiredFieldNotFound("something", "dummy");
  test("Exception properties are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e).toBeInstanceOf(EntityRequiredFieldNotFound);
      expect(e.code).toBe(404);
      expect(e.name).toBe("EntityRequiredFieldNotFound");
      expect(e.message).toBe("Required field dummy was not found in something");
    }
  });
});
