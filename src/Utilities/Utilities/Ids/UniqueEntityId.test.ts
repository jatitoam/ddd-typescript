import { UniqueEntityId } from "../../Ids/UniqueEntityId";

describe("UniqueEntityId", () => {
  test("Null id generates uuid", () => {
    const uid = new UniqueEntityId();
    expect(typeof uid.toValue()).toBe("string");
    expect(uid.toString().length).toBe(36);
  });

  test("Received identifiers are set", () => {
    const uid = new UniqueEntityId(1);
    expect(uid.toValue()).toBe(1);
  });
});
