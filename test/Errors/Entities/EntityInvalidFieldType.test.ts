import { EntityInvalidFieldType } from "../../../src/Errors/Entities/EntityInvalidFieldType";

describe("EntityInvalidFieldType", () => {
  const e = new EntityInvalidFieldType("something", "dummy", "type");
  test("Exception properties are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldType);
      expect(e.code).toBe(406);
      expect(e.name).toBe("EntityInvalidFieldType");
      expect(e.message).toBe("Field dummy in something is not a type");
    }
  });
});
