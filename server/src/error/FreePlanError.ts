export class FreePlanError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FreePlanLimit';
  }
}
