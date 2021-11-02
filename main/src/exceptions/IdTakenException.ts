export class IdTakenException extends Error {
  constructor() {
    super('The provided ID is already in use in the DB');
    Object.setPrototypeOf(this, IdTakenException.prototype);
  }
}
