import { InvalidArgumentError } from "Errors/InvalidArgumentError";
import { ValueData } from "Types/ValueData";

export class Store {
  /**
   * Store that will hold the values.
   */
  protected store: Map<string, ValueData>;

  /**
   * Context for the store's values
   */
  protected context: string = null;

  /**
   * Initializes a new store
   *
   * @param context  Values' context.  It can be used as an inner store
   */
  constructor(context: string = null) {
    if (null !== context && !context.length) {
      throw new InvalidArgumentError(
        "The given context cannot be an empty string"
      );
    }
    this.store = new Map<string, ValueData>();
    this.context = context;
  }

  /**
   * Retrieves all existing values from the store
   *
   * @returns array
   */
  public getValues(): Map<string, ValueData> {
    return this.store;
  }

  /**
   * Returns a sanitized key
   *
   * @param key key to be sanitized
   *
   * @throws InvalidArgumentError
   */
  protected sanitizeKey(key: string): string {
    if (null === key || !key.trim().length) {
      throw new InvalidArgumentError(
        "The requested key cannot be an empty string"
      );
    }

    return key.trim().toLowerCase();
  }

  /**
   * Returns true if the value exists in the store
   *
   * @param key Key of the Value to be searched.
   *
   * @throws InvalidArgumentError
   */
  public has(key: string): boolean {
    const intKey = this.sanitizeKey(key);

    return this.store.has(intKey);
  }

  /**
   * Retrieves a value from the Store.
   *
   * @param key Key of the value to be retrieved
   * @param defaultValue Default returned value, if not found
   */
  public get(key: string, defaultValue: ValueData = null) {
    const intKey = this.sanitizeKey(key);

    if (this.has(intKey)) {
      return this.store.get(intKey);
    }

    return defaultValue;
  }

  /**
   * Sets a value in the Store.
   *
   * @param key Key of the Value to be set
   * @param value Value to be set
   *
   * @throws InvalidArgumentException
   */
  public set(key: string, value: ValueData): true {
    const intKey = this.sanitizeKey(key);

    this.store.set(intKey, value);

    return true;
  }

  /**
   * Removes a given value from the Store.
   *
   * @param key Key of the value to be removed from the store
   *
   * @throws InvalidArgumentException
   */
  public delete(key: string): boolean {
    const intKey = this.sanitizeKey(key);

    if (!this.has(intKey)) {
      return false;
    }

    return this.store.delete(intKey);
  }

  /**
   * Serializes the values for a json output
   */
  public serialize(): object {
    const obj = {};
    if (!this.store.size) return obj;
    this.store.forEach((value: ValueData, key: string) => {
      obj[key] = value;
    });
    return obj;
  }

  /**
   * Gets size of store
   *
   * @returns number
   */
  public getSize(): number {
    return this.store.size;
  }
}
