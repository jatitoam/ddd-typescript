import { v4 as uuidv4 } from "uuid";
import { Identifier } from "Utilities/Ids/Identifier";
import { IdValue } from "Types/IdValue";

/**
 * Unique entity id class - identifiers in string or number
 * Auto-generates UUID if no id is given
 *
 * Based on https://github.com/stemmlerjs/white-label/blob/master/src/core/domain/UniqueEntityID.ts
 */
export class UniqueEntityId extends Identifier<IdValue> {
  constructor(id?: IdValue) {
    super(id ? id : uuidv4());
  }
}
