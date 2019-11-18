import * as Joi from '@hapi/joi';
import express from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { ApiOperationGet, ApiPath, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { MiddlewareFactory } from '../middleware';

@ApiPath({
  path: '/ping',
  name: 'Ping'
})
@controller('/ping')
export class PingController {

  protected static validation = Joi.object({
    name: Joi.string().required()
  });

  @ApiOperationGet({
    path: '/',
    description: 'Returns a string of pong',
    summary: 'Pong',
    responses: {
      200: { description: 'Success', type: SwaggerDefinitionConstant.Response.Type.STRING }
    }
  })
  @httpGet('/')
  public pong(req: express.Request, res: express.Response) {
    return 'pong';
  }

  @ApiOperationGet({
    path: '/test',
    description: 'Returns back your name!',
    summary: 'Hello World',
    responses: {
      200: { description: 'Success', type: SwaggerDefinitionConstant.Response.Type.STRING },
      400: { description: 'Bad Request', type: SwaggerDefinitionConstant.Response.Type.STRING }
    },
    parameters: {
      query: {
        name: { required: true }
      }
    }
  })
  @httpGet('/test', MiddlewareFactory.validateQuerySchema(PingController.validation))
  public test(req: express.Request, res: express.Response) {
    return `Hello ${req.query.name}`;
  }
}
