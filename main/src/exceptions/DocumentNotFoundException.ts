export class DocumentNotFoundException extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, DocumentNotFoundException.prototype);
  }
}
