export class FreePlanError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'FreePlanLimit';
  }
}
