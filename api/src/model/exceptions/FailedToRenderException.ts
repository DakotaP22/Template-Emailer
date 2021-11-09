export class FailedToRenderException extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, FailedToRenderException.prototype);
  }
}
