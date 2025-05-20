export class UrlAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UrlAlreadyExistsError';
  }
}