/**
 * Generic error - base error class for the application
 */
export class GenericError extends Error {
  code = 500;
  message = "Application error";

  constructor(message?: string) {
    super(message);
    this.name = (<any>this).constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
