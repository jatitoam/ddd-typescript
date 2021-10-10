import { EntityRequiredFieldsNotFound } from "../../../src/Errors/Entities/EntityRequiredFieldsNotFound";

describe("EntityRequiredFieldNotFound", () => {
  const es = new EntityRequiredFieldsNotFound("something", ["dummy1"]);
  const ep = new EntityRequiredFieldsNotFound("something", [
    "dummy1",
    "dummy2",
  ]);
  test("Exception properties are found", () => {
    try {
      throw es;
    } catch (e) {
      expect(e).toBeInstanceOf(EntityRequiredFieldsNotFound);
      expect(e.code).toBe(404);
      expect(e.name).toBe("EntityRequiredFieldsNotFound");
    }
  });

  test("Exception message in singular succeeds", () => {
    try {
      throw es;
    } catch (e) {
      expect(e.message).toBe(
        "Required field dummy1 was not found in something"
      );
    }
  });

  test("Exception message in plural succeeds", () => {
    try {
      throw ep;
    } catch (e) {
      expect(e.message).toBe(
        "Required fields dummy1, dummy2 were not found in something"
      );
    }
  });
});
