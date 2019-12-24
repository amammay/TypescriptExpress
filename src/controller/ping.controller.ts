import * as Joi from '@hapi/joi';
import express from 'express';
import {inject} from 'inversify';
import {controller, httpGet} from 'inversify-express-utils';
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from 'swagger-express-ts';
import {IocTypes} from '../ioc/types';
import {MiddlewareFactory} from '../middleware';
import {PingService} from '../services';

@ApiPath({
  path: '/ping',
  name: 'Ping'
})
@controller('/ping')
export class PingController {

  protected static validation = Joi.object({
    name: Joi.string().required()
  });

  constructor(@inject(IocTypes.PingService) private readonly pingService: PingService) {

  }

  @ApiOperationGet({
    path: '/',
    description: 'Returns a string of pong',
    summary: 'Pong',
    responses: {
      200: {description: 'Success', type: SwaggerDefinitionConstant.Response.Type.STRING}
    }
  })
  @httpGet('/')
  public ping(req: express.Request, res: express.Response) {
    return this.pingService.ping();
  }

  @ApiOperationGet({
    path: '/test',
    description: 'Returns back your name!',
    summary: 'Hello World',
    responses: {
      200: {description: 'Success', type: SwaggerDefinitionConstant.Response.Type.STRING},
      400: {description: 'Bad Request', type: SwaggerDefinitionConstant.Response.Type.STRING}
    },
    parameters: {
      query: {
        name: {required: true, name: 'name', type: 'string'}
      }
    }
  })
  @httpGet('/test', MiddlewareFactory.validateQuerySchema(PingController.validation))
  public async test(req: express.Request, res: express.Response) {
    return await this.pingService.formatName(req.query.name);
  }
}
