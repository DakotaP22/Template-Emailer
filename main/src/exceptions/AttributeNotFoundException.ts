export class AttributeNotFoundException extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, AttributeNotFoundException.prototype);
  }
}
