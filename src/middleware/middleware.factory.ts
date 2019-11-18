import { createValidator } from 'express-joi-validation';

const validator = createValidator();

export const MiddlewareFactory = {
  validateQuerySchema: (querySchema: any) => validator.query(querySchema),
  validateBodySchema: (bodySchema: any) => validator.body(bodySchema)
};
