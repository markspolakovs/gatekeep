export class SecretUnresolvedError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'SecretUnresolvedError';
  }
}
