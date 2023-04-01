import { Entity } from "Entities/Entity";
import { UniqueEntityId } from "Utilities/Ids/UniqueEntityId";

export interface IRepository {
  /**
   * get repository record by id
   *
   * @param id
   *
   * @throws IdNotFoundError
   */
  get(id: UniqueEntityId): Entity<any>;

  /**
   * finds the repository record by id
   *
   * @param id
   */
  findById(id: UniqueEntityId): Entity<any> | null;
}
