import { IFieldDefinition } from "Types/Entities/IFieldDefinition";

/**
 * Entity definition with a set of required and optional fields
 */
export interface IEntityDefinition {
  readonly required: IFieldDefinition[];
  readonly optional: IFieldDefinition[];
}
