import { MetadataValue } from "@grpc/grpc-js";
import { ValueData } from "../../../src/Types/ValueData";
import { FiltersInfo } from "../../../src/ValueObjects/Data/FiltersInfo";
import { Store } from "../../../src/ValueObjects/Collections/Store";

describe("FiltersInfo", () => {
  class FiltersInfoPublic extends FiltersInfo {
    public mapToStorePublic(map: Map<string, ValueData>): Store {
      return this.mapToStore(map);
    }
  }

  let filtersInfo: FiltersInfoPublic;
  let map: Map<string, ValueData>;

  beforeEach(() => {
    map = new Map<string, ValueData>();
    map.set("key1", 1);
    map.set("key2", 2);
    filtersInfo = new FiltersInfoPublic(map, "search");
  });

  test("Creation of FiltersInfo object", () => {
    expect(filtersInfo).toBeInstanceOf(FiltersInfo);
  });

  test("Creation from map to store", () => {
    const store = filtersInfo.mapToStorePublic(map);
    expect(store).toBeInstanceOf(Store);
    expect(store.getSize()).toBe(2);
  });

  test("Serialize", () => {
    const serialize = filtersInfo.serialize();
    expect(serialize).toBeInstanceOf(Object);
    expect(serialize).toStrictEqual({
      filters: {
        key1: 1,
        key2: 2,
      },
      search: "search",
    });
  });

  test("Get filters", () => {
    const filters = filtersInfo.getFilters();
    expect(filters).toBeInstanceOf(Store);
    expect(filters.getSize()).toBe(2);
  });

  test("Get search", () => {
    const search = filtersInfo.getSearch();
    expect(search).toBe("search");
  });
});
