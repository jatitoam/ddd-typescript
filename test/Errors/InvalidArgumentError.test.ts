import { InvalidArgumentError } from "../../src/Errors/InvalidArgumentError";

describe("InvalidArgumentError", () => {
  const e = new InvalidArgumentError();
  test("Can be instantiated as an error", () => {
    expect(e).toBeInstanceOf(Error);
  });

  test("Exception can be thrown", () => {
    const t = () => {
      throw e;
    };
    expect(t).toThrow(InvalidArgumentError);
  });

  test("Exception code, name and message are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e.code).toBe(500);
      expect(e.name).toBe("InvalidArgumentError");
      expect(e.message).toBe("Invalid argument error");
    }
  });
});
