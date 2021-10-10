import { EntityInvalidFieldTypes } from "../../../src/Errors/Entities/EntityInvalidFieldTypes";

describe("EntityInvalidFieldTypes", () => {
  const es = new EntityInvalidFieldTypes("something", ["dummy1"], ["type1"]);
  const ep = new EntityInvalidFieldTypes(
    "something",
    ["dummy1", "dummy2"],
    ["type1", "type2"]
  );
  test("Exception properties are found", () => {
    try {
      throw es;
    } catch (e) {
      expect(e).toBeInstanceOf(EntityInvalidFieldTypes);
      expect(e.code).toBe(406);
      expect(e.name).toBe("EntityInvalidFieldTypes");
    }
  });

  test("Exception message in singular succeeds", () => {
    try {
      throw es;
    } catch (e) {
      expect(e.message).toBe(
        "Field dummy1 in something is not the right type: type1"
      );
    }
  });

  test("Exception message in plural succeeds", () => {
    try {
      throw ep;
    } catch (e) {
      expect(e.message).toBe(
        "Fields dummy1, dummy2 in something are not the right type: type1, type2"
      );
    }
  });
});
