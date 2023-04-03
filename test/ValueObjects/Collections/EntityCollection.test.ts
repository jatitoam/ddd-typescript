import { EntityCollection } from "../../../src/ValueObjects/Collections/EntityCollection";
import { Entity } from "../../../src/Entities/Entity";
import { UniqueEntityId } from "../../../src/Utilities/Ids/UniqueEntityId";
import { IEntity } from "../../../src/Contracts/IEntity";
import { IdValue } from "../../../src/Types/IdValue";
import { OutOfRangeError } from "../../../src/Errors/OutOfRangeError";
import { OutOfBoundsError } from "../../../src/Errors/OutOfBoundsError";
import { OverflowError } from "../../../src/Errors/OverflowError";

jest.mock("../../../src/Utilities/Ids/UniqueEntityId");
jest.mock("../../../src/Entities/Entity");

describe("EntityCollection", () => {
  type mockType = {
    dummyInt: number;
    dummyString?: string;
  };

  class MockEntity extends Entity<mockType> {}

  const mockUniqueEntityIdConstructor = jest
    .fn()
    .mockImplementation((id: number) => {
      return {
        id: id,
        toValue: () => id,
        toString: () => id.toString(),
      };
    });

  const MockedUniqueEntityId =
    mockUniqueEntityIdConstructor as jest.MockedClass<typeof UniqueEntityId>;

  const mockEntityConstructor = jest
    .fn()
    .mockImplementation((props: mockType, id: UniqueEntityId) => {
      return {
        _id: id,
        getId: () => id.toValue(),
        serialize: () => id.toValue(),
      };
    });

  const MockedEntity = mockEntityConstructor as jest.MockedClass<
    typeof MockEntity
  >;

  const entity1 = new MockedEntity(
    { dummyInt: 1 },
    new MockedUniqueEntityId(1)
  );
  const entity2 = new MockedEntity(
    { dummyInt: 2 },
    new MockedUniqueEntityId(2)
  );
  const entity3 = new MockedEntity(
    { dummyInt: 3 },
    new MockedUniqueEntityId(3)
  );

  class EntityCollectionPublic<
    IE extends IEntity
  > extends EntityCollection<IE> {
    public sanitizeIdPublic(id: IdValue): IdValue {
      return this.sanitizeId(id);
    }
  }

  let entityCollection: EntityCollectionPublic<MockEntity>;

  beforeEach(() => {
    MockedUniqueEntityId.mockClear();

    entityCollection = new EntityCollectionPublic<MockEntity>();
  });

  test("Builds a new collection", () => {
    expect(entityCollection).toBeInstanceOf(EntityCollection);
  });

  test("Add an entity to the collection succeeds", () => {
    const ec = entityCollection.add(entity1);
    expect(ec).toBeInstanceOf(EntityCollection);
  });

  test("Iterate through entities", () => {
    entityCollection.add(entity1).add(entity2).add(entity3);
    let i = 0;
    for (const entity of entityCollection) {
      i++;
      expect(entity.getId()).toBe(i);
    }
    expect(i).toBe(3);
    expect(entityCollection.getSize()).toBe(3);
  });

  test("Return cursor", () => {
    entityCollection.add(entity1);
    let i = 0;
    for (const entity of entityCollection) {
      i++;
      return;
    }
    expect(i).toBe(1);
  });

  test("Get all collection", () => {
    entityCollection.add(entity1).add(entity2).add(entity3);
    const map = entityCollection.getAll();
    expect(map).toBeInstanceOf(Map);
    expect(map.size).toBe(3);
  });

  test("Sanitize id fails", () => {
    try {
      entityCollection.sanitizeIdPublic(0);
    } catch (e) {
      expect(e).toBeInstanceOf(OutOfRangeError);
    }

    try {
      entityCollection.sanitizeIdPublic("");
    } catch (e) {
      expect(e).toBeInstanceOf(OutOfRangeError);
    }
  });

  test("Sanitize works", () => {
    const i = entityCollection.sanitizeIdPublic(1);
    expect(i).toBe(1);
    const s = entityCollection.sanitizeIdPublic("id1");
    expect(s).toBe("id1");
  });

  test("Has (true and false)", () => {
    entityCollection.add(entity1);
    expect(entityCollection.has(1)).toBeTruthy;
    expect(entityCollection.has(2)).toBeFalsy;
  });

  test("Error when getting an unexisting key", () => {
    try {
      entityCollection.get(1);
    } catch (e) {
      expect(e).toBeInstanceOf(OutOfBoundsError);
    }
  });

  test("Succeeds getting an existing key", () => {
    entityCollection.add(entity1);
    const entity = entityCollection.get(1);
    expect(entity).toStrictEqual(entity1);
  });

  test("Serializes", () => {
    entityCollection.add(entity1).add(entity2);
    const serialize = entityCollection.serialize();
    expect(serialize).toBeInstanceOf(Array);
    expect(serialize.length).toBe(2);
    expect(serialize).toStrictEqual([1, 2]);
  });

  test("Get all ids", () => {
    entityCollection.add(entity1).add(entity2);
    const ids = entityCollection.ids();
    expect(ids).toBeInstanceOf(Array);
    expect(ids.length).toBe(2);
    expect(ids).toStrictEqual([1, 2]);
  });

  test("Add a repeating entity fails", () => {
    entityCollection.add(entity1);
    try {
      entityCollection.add(entity1);
    } catch (e) {
      expect(e).toBeInstanceOf(OverflowError);
    }
  });

  test("Remove an unexisting entity fails", () => {
    try {
      entityCollection.remove(1);
    } catch (e) {
      expect(e).toBeInstanceOf(OutOfBoundsError);
    }
  });

  test("Removing an entity succeeds", () => {
    entityCollection.add(entity1).add(entity2);
    entityCollection.remove(1);
    expect(entityCollection.getSize()).toBe(1);
  });

  test("Throwing an error works", () => {
    try {
      entityCollection.throw(new Error());
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});
