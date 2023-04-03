import { OutOfBoundsError } from "../../src/Errors/OutOfBoundsError";

describe("InvalidArgumentError", () => {
  const e = new OutOfBoundsError();
  test("Can be instantiated as an error", () => {
    expect(e).toBeInstanceOf(Error);
  });

  test("Exception can be thrown", () => {
    const t = () => {
      throw e;
    };
    expect(t).toThrow(OutOfBoundsError);
  });

  test("Exception code, name and message are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e.code).toBe(500);
      expect(e.name).toBe("OutOfBoundsError");
      expect(e.message).toBe("Out of bounds error");
    }
  });
});
