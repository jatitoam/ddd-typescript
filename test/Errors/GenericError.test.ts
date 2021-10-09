import { GenericError } from "../../src/Errors/GenericError";

describe("GenericError", () => {
  const e = new GenericError();
  test("Can be instantiated as an error", () => {
    expect(e).toBeInstanceOf(Error);
  });

  test("Exception can be thrown", () => {
    const t = () => {
      throw e;
    };
    expect(t).toThrow(GenericError);
  });

  test("Exception code, name and message are found", () => {
    try {
      throw e;
    } catch (e) {
      expect(e.code).toBe(500);
      expect(e.name).toBe("GenericError");
      expect(e.message).toBe("Application error");
    }
  });
});
