import { SortInfo } from "../../../src/ValueObjects/Data/SortInfo";
import { InvalidArgumentError } from "../../../src/Errors/InvalidArgumentError";

describe("SortInfo", () => {
  let sortInfo: SortInfo;

  beforeEach(() => {
    sortInfo = new SortInfo("field", "defaultField");
  });

  test("Builds a new SortInfo object", () => {
    expect(sortInfo).toBeInstanceOf(SortInfo);
  });

  test("Cannot build an invalid object", () => {
    try {
      new SortInfo("", "defaultField", "asc");
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }

    try {
      new SortInfo("field", "", "asc");
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });

  test("Builds a sort string", () => {
    expect(sortInfo.toString()).toBe("orderby=field&orderdir=asc");
  });

  test("Serializes a sort info object", () => {
    expect(sortInfo.serialize()).toStrictEqual({
      field: "field",
      defaultField: "defaultfield",
      direction: "asc",
    });
  });

  test("Getters", () => {
    expect(sortInfo.getField()).toBe("field");
    expect(sortInfo.getDirection()).toBe("asc");
  });
});
