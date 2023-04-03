import { ValueData } from "Types/ValueData";
import { Store } from "ValueObjects/Collections/Store";

/**
 * Filters information class
 *
 * Used for building and showing a paginated collection.
 */
export class FiltersInfo {
  /**
   * Dynamic filters and their values
   */
  protected filters: Store;

  /**
   * Search value
   */
  protected search = "";

  /**
   * Creates a new instance of the object
   *
   * @param filters Dynamic filters key and their values
   * @param search Search value
   */
  constructor(filters: Map<string, ValueData>, search: string) {
    this.filters = this.mapToStore(filters);
    this.search = search;
  }

  /**
   * Converts array to store.
   *
   * @param array Array that is going to be converted to Store.
   *
   * @returns Store
   */
  protected mapToStore(map: Map<string, ValueData>): Store {
    const store = new Store();

    map.forEach((value: ValueData, filter: string) => {
      store.set(filter, value);
    });

    return store;
  }

  /**
   * Returns an array containing all its item's serialized data.
   *
   * @returns object
   */
  public serialize(): object {
    return {
      filters: this.filters.serialize(),
      search: this.search,
    };
  }

  /**
   * Filters getter
   *
   * @returns Store
   */
  public getFilters(): Store {
    return this.filters;
  }

  /**
   * Search getter
   * @returns string
   */
  public getSearch(): string {
    return this.search;
  }
}
