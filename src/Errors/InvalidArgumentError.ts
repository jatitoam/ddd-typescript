import { GenericError } from "./GenericError";

/**
 * Invalid argument error
 */
export class InvalidArgumentError extends GenericError {
  message = "Invalid argument error";
}
