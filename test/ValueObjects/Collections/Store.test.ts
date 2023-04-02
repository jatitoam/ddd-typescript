import { Store } from "../../../src/ValueObjects/Collections/Store";
import { InvalidArgumentError } from "../../../src/Errors/InvalidArgumentError";

describe("Store", () => {
  class PublicStore extends Store {
    public publicSanitizeKey(key: string) {
      return this.sanitizeKey(key);
    }
  }

  let store: PublicStore;

  beforeEach(() => {
    store = new PublicStore();
  });

  test("Store creation and structure", () => {
    expect(store).toBeInstanceOf(Store);
  });

  test("Disallow creating a store with invalid context", () => {
    try {
      new Store("");
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });

  test("Store with null context", () => {
    const values = store.getValues();
    const serialize = store.serialize();
    expect(values).toBeInstanceOf(Map);
    expect(serialize).toBeInstanceOf(Object);
    expect(values.size).toBe(0);
    expect(Object.keys(serialize).length).toBe(0);
  });

  test("Sanitize breaks with invalid key", () => {
    try {
      store.publicSanitizeKey("");
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidArgumentError);
    }
  });

  test("Sanitize converts to lowercase and trims", () => {
    const key = store.publicSanitizeKey(" key ");
    expect(key).toBe("key");
  });

  test("Does not report an unexisting key", () => {
    expect(store.has("non-existing")).toBeFalsy();
  });

  test("Return default value when trying to get an unexisting key", () => {
    expect(store.get("non-existing", "default")).toBe("default");
  });

  test("Deleting an unexisting key fails", () => {
    expect(store.delete("non-existing")).toBeFalsy();
  });

  test("Sets a key/value in the store, retrieve it and delete it", () => {
    // Set a new key/value
    expect(store.set("key", "value")).toBeTruthy();
    expect(store.has("key")).toBeTruthy();
    expect(store.get("key")).toBe("value");

    const values = store.getValues();
    const serialize = store.serialize();

    expect(values).toBeInstanceOf(Map);
    expect(values.size).toBe(1);
    expect(serialize).toBeInstanceOf(Object);
    expect(Object.keys(serialize).length).toBe(1);

    // First delete will succeed
    expect(store.delete("key")).toBeTruthy();
    // Second delete will fail
    expect(store.delete("key")).toBeFalsy();
  });

  test("Sets two key/values in the store without confusing them", () => {
    expect(store.set("key1", 1)).toBeTruthy();
    expect(store.set("key2", 2)).toBeTruthy();
    expect(store.has("key1")).toBeTruthy();
    expect(store.has("key2")).toBeTruthy();
    expect(store.get("key1")).toBe(1);
    expect(store.get("key2")).toBe(2);

    const values = store.getValues();
    expect(values).toBeInstanceOf(Map);
    expect(values.size).toBe(2);
  });
});
