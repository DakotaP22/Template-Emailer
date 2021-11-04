export class FailedToCreateDocumentException extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, FailedToCreateDocumentException.prototype);
  }
}
