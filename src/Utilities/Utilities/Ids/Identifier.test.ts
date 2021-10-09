import { Identifier } from "../../Ids/Identifier";

describe("Identifier", () => {
  const i1 = new Identifier("test-string");
  const i1a = new Identifier("test-string");
  const i2 = new Identifier("test-string2");
  const ii = new Identifier(1);

  test("Invalid identifiers do not match", () => {
    expect(i1.equals(null)).toBe(false);
    expect(i1.equals(undefined)).toBe(false);
  });

  test("Equal identifiers match", () => {
    expect(i1.equals(i1)).toBe(true);
    expect(i1.equals(i1a)).toBe(true);
  });

  test("Different identifiers do not match", () => {
    expect(i1.equals(i2)).toBe(false);
  });

  test("Stringify identifier works", () => {
    expect(ii.toString()).toBe("1");
    expect(i1.toString()).toBe("test-string");
  });

  test("Return natural value works", () => {
    expect(ii.toValue()).toBe(1);
    expect(i1.toValue()).toBe("test-string");
  });
});
