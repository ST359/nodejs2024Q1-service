export class AccessDenied extends Error {
    constructor(message: string = 'Access denied') {
      super(message);
    }
  }