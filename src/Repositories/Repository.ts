import { IRepository } from "Contracts/Repositories/IRepository";
import { Entity } from "Entities/Entity";
import { IdNotFoundError } from "Errors/IdNotFoundError";
import { UniqueEntityId } from "Utilities/Ids/UniqueEntityId";

export class Repository implements IRepository {
  /**
   * get repository record by id
   *
   * @param id
   *
   * @throws IdNotFoundError
   */
  public get(id: UniqueEntityId): Entity<any> {
    throw new IdNotFoundError(id.toString());
  }

  /**
   * finds the repository record by id
   *
   * @param id
   */
  public findById(id: UniqueEntityId): Entity<any> | null {
    return null;
  }
}
