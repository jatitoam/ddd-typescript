import { FieldDefinition } from "./FieldDefinition";

/**
 * Entity definition with a set of required and optional fields
 */
export interface EntityDefinition {
  readonly required: FieldDefinition[];
  readonly optional: FieldDefinition[];
}
