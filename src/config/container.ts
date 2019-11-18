import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import express from 'express';
import {Container, inject} from 'inversify';
import {autoProvide} from 'inversify-binding-decorators';
import {InversifyExpressServer} from 'inversify-express-utils';
import morgan from 'morgan';
import '../ioc/loader';
import {stream} from '../logging';
import {addSwagger} from './swagger';

const container = new Container();
const router = express.Router();
addSwagger(router);
const server = new InversifyExpressServer(container, router);
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
export {server, autoProvide, inject};
