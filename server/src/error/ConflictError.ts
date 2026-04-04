export class ConflictError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 409) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ConflictError';
  }
}
