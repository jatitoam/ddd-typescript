import { UniqueEntityId } from "Utilities/Ids/UniqueEntityId";

export interface IRepository<Entity> {
  /**
   * get repository record by id
   *
   * @param id
   *
   * @throws IdNotFoundError
   */
  get(id: UniqueEntityId): Entity;

  /**
   * finds the repository record by id
   *
   * @param id
   */
  findById(id: UniqueEntityId): Entity | null;
}
