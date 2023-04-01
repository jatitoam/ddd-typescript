import { RepositoryFactory } from "../../../src/Factories/Repositories/RepositoryFactory";
import { IRepository } from "../../../src/Contracts/Repositories/IRepository";
import { Repository } from "../../../src/Repositories/Repository";

describe("RepositoryFactory", () => {
  // Proxy class for protected method
  abstract class RepositoryFactoryPublic extends RepositoryFactory {
    public static createPublic(): IRepository {
      return this.create();
    }
  }

  test("Repository can be created", () => {
    const repository = RepositoryFactoryPublic.createPublic();
    expect(repository).toBeInstanceOf(Repository);
  });

  test("Repository can be retrieved from Factory", () => {
    const repository = RepositoryFactory.get();
    expect(repository).toBeInstanceOf(Repository);
  });
});
