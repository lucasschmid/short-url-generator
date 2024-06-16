import { User } from '../../src/models/index.model';

declare global {
  namespace Express {
      interface Request{
          user: any
      }
  }
}