/**
 * Field definition
 */
export interface IFieldDefinition {
  readonly name: string;
  readonly type: "string" | "number" | "boolean" | "bigint" | "symbol";
}
