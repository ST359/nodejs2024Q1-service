export class EntityNotFound extends Error {
    constructor() {
      super('Failed to find entity in database');
    }
  }