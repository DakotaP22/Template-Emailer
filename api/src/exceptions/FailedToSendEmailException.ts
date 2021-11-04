export class FailedToSendEmailException extends Error {
  constructor() {
    super();
    Object.setPrototypeOf(this, FailedToSendEmailException.prototype);
  }
}
