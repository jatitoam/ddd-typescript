import { v4 as uuidv4 } from "uuid";
import { Identifier } from "./Identifier";

/**
 * Unique entity id class - identifiers in string or number
 * Auto-generates UUID if no id is given
 *
 * Based on https://github.com/stemmlerjs/white-label/blob/master/src/core/domain/UniqueEntityID.ts
 */
export class UniqueEntityId extends Identifier<string | number> {
  constructor(id?: string | number) {
    super(id ? id : uuidv4());
  }
}
