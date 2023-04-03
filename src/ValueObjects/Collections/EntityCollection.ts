import { OutOfBoundsError } from "Errors/OutOfBoundsError";
import { OutOfRangeError } from "Errors/OutOfRangeError";
import { IEntity } from "Contracts/IEntity";
import { IdValue } from "Types/IdValue";
import { OverflowError } from "Errors/OverflowError";

/**
 * Entity Collection class
 * This class will hold, process, encapsulate and group Entity objects together and indexed by id
 */
export class EntityCollection<IE extends IEntity>
  implements IterableIterator<IE>
{
  /**
   * Holder map of all the entities
   */
  private map: Map<IdValue, IE>;

  /**
   * Index of the iterator
   */
  private index = 0;

  constructor() {
    this.map = new Map<IdValue, IE>();
  }

  /**
   * @returns IterableIterator
   */
  [Symbol.iterator](): IterableIterator<IE> {
    return this;
  }

  /**
   * Returns an IteratorResult object containing the next Entity in the collection
   * @returns IteratorResult
   */
  public next(): IteratorResult<IE> {
    if (this.index >= this.map.size) {
      this.index = 0;
      return { done: true, value: null };
    }

    const entity = Array.from(this.map.values())[this.index];
    this.index++;

    return { done: false, value: entity };
  }

  /**
   * This method is called when the iteration is prematurely terminated
   * @param value
   * @returns IteratorResult
   */
  public return?(value?: IE): IteratorResult<IE> {
    this.index = 0;
    return { done: true, value };
  }

  /**
   * Throws the given error
   * @param e Error
   */
  public throw?(e?: Error): IteratorResult<IE> {
    throw e;
  }

  /**
   * Returns the full collection of entities as a map
   *
   * @returns Map
   */
  public getAll(): Map<IdValue, IE> {
    return this.map;
  }

  /**
   * Sanitizes the id preventing invalid values
   *
   * @param id
   * @returns IdValue
   * @throws OutOfRangeError
   */
  protected sanitizeId(id: IdValue): IdValue {
    if (typeof id === "number" && id <= 0) {
      throw new OutOfRangeError("Supplied ID should be a positive integer");
    } else if (typeof id === "string" && id === "") {
      throw new OutOfRangeError("Supplied ID should not be an empty string");
    }

    return id;
  }

  /**
   * Returns TRUE if an Entity with the supplied ID exists in the collection.
   *
   * @param id UniqueEntityId
   * @throws OutOfRangeError
   */
  public has(id: IdValue): boolean {
    const intId = this.sanitizeId(id);
    return this.map.has(intId);
  }

  /**
   * Retrieves the Collection's Entity with the supplied ID.
   *
   * @param id UniqueEntityId
   * @throws OutOfRangeError
   */
  public get(id: IdValue): IE {
    const intId = this.sanitizeId(id);

    if (!this.has(id))
      throw new OutOfBoundsError(
        "The Entity you are trying to retrieve does not exist in the Collection"
      );

    return this.map.get(id);
  }

  /**
   * Counts the number of elements the Collection contains.
   *
   * @returns number
   */
  public getSize(): number {
    return this.map.size;
  }

  /**
   * Returns an array containing all its item's serialized data.
   * @returns Array
   */
  public serialize(): Array<object> {
    const array = [];
    this.map.forEach((entity: IE) => {
      array.push(entity.serialize());
    });
    return array;
  }

  /**
   * Returns the list of Entity's IDs loaded in the Collection
   * @returns Array
   */
  public ids(): Array<IdValue> {
    const ids: Array<IdValue> = [];
    for (const key of this.map.keys()) {
      ids.push(key);
    }
    return ids;
  }

  /**
   * Adds a new Entity to the Collection.
   *
   * @param entity
   * @returns this
   *
   * @throws OverflowError
   */
  public add(entity: IE): this {
    const intId = this.sanitizeId(entity.getId());

    if (this.has(intId)) {
      throw new OverflowError(
        "The Entity you are trying to add to the Collection already exists"
      );
    }

    this.map.set(intId, entity);

    return this;
  }

  /**
   * Removes an Entity, identified by the supplied ID, from the Collection.
   *
   * @param id
   *
   * @returns boolean
   */
  public remove(id: IdValue): boolean {
    const intId = this.sanitizeId(id);

    if (!this.has(id))
      throw new OutOfBoundsError(
        "The Entity you are trying to retrieve does not exist in the Collection"
      );

    return this.map.delete(id);
  }
}
