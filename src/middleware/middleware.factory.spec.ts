import * as Joi from '@hapi/joi';
import {getMockReq, getMockRes} from '@jest-mock/express';
import express from 'express';
import {MiddlewareFactory} from './middleware.factory';
import fn = jest.fn;

describe('Middleware Factory', () => {
  const validation = Joi.object({
    name: Joi.string().required()
  });

  let validateQuery: any = null;
  let validateBody: any = null;

  beforeEach(() => {
    validateQuery = MiddlewareFactory.validateQuerySchema(validation);
    validateBody = MiddlewareFactory.validateBodySchema(validation);
  });

  test('Validate query schema', () => {
    const {next} = getMockRes();
    validateQuery({query: {name: 'alex'}} as express.Request, {} as express.Response, next);
    expect(next).toHaveBeenCalled();
  });

  test('Validate query schema, improper request', () => {
    const {res, next} = getMockRes();
    const req = getMockReq({params: {}});
    res.end = fn();
    validateQuery(req, res, next);
    expect(res.end).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('Validate body schema', () => {
    const {next} = getMockRes();
    validateBody({body: {name: 'alex'}} as express.Request, {} as express.Response, next);
    expect(next).toHaveBeenCalled();
  });

  test('Validate body schema, improper request', () => {
    const {res, next} = getMockRes();
    const req = getMockReq({params: {}});
    res.end = fn();
    validateBody(req, res, next);
    expect(res.end).toBeCalled();
    expect(res.status).toHaveBeenCalledWith(400);
  });

});
