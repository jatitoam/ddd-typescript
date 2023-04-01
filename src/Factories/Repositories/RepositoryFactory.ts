import { IRepository } from "Contracts/Repositories/IRepository";
import { Repository } from "Repositories/Repository";

/**
 * Singleton class to build a repository
 */
export abstract class RepositoryFactory {
  /**
   * Static repository (singleton pattern)
   */
  private static repository: IRepository = null;

  /**
   * Creates a new repository for singleton
   *
   * @returns IRepository
   */
  protected static create(): IRepository {
    return new Repository();
  }

  /**
   * Gets the singleton repository
   *
   * @returns IRepository
   */
  public static get(): IRepository {
    if (this.repository === null) {
      this.repository = this.create();
    }

    return this.repository;
  }
}
