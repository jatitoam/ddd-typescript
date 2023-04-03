import { GenericError } from "./GenericError";

/**
 * Out of range error
 */
export class OutOfBoundsError extends GenericError {
  message = "Out of bounds error";
}
