import { OutOfRangeError } from "../../src/Errors/OutOfRangeError";

describe("InvalidArgumentError", () => {
  const e = new OutOfRangeError();
  test("Can be instantiated as an error", () => {
    expect(e).toBeInstanceOf(Error);
  });

  test("Exception can be thrown", () => {
    const t = () => {
      throw e;
    };
    expect(t).toThrow(OutOfRangeError);
  });

  test("Exception code, name and message are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e.code).toBe(500);
      expect(e.name).toBe("OutOfRangeError");
      expect(e.message).toBe("Out of range error");
    }
  });
});
