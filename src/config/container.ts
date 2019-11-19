import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import express from 'express';
import {Container, inject} from 'inversify';
import {autoProvide, makeFluentProvideDecorator} from 'inversify-binding-decorators';
import {InversifyExpressServer} from 'inversify-express-utils';
import morgan from 'morgan';
import {stream} from '../logging';

const container = new Container();
const fluentProvider = makeFluentProvideDecorator(container);
const provide = (identifier: any) => {
  return fluentProvider(identifier).inTransientScope().done();
};

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream}));
  app.use(bodyParser.json());
});

server.setErrorConfig((app) => {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).send('Something broke!');
  });
});
export {server, autoProvide, provide, inject};
