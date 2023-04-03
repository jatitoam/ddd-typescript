import { OverflowError } from "../../src/Errors/OverflowError";

describe("InvalidArgumentError", () => {
  const e = new OverflowError();
  test("Can be instantiated as an error", () => {
    expect(e).toBeInstanceOf(Error);
  });

  test("Exception can be thrown", () => {
    const t = () => {
      throw e;
    };
    expect(t).toThrow(OverflowError);
  });

  test("Exception code, name and message are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e.code).toBe(500);
      expect(e.name).toBe("OverflowError");
      expect(e.message).toBe("Overflow error");
    }
  });
});
