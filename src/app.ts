import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import { container } from './ioc/ioc';
// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';

const server = new InversifyExpressServer(container);
server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.use(bodyParser.json());
});

server.setErrorConfig((app) => {
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
});

const serverInstance = server.build();
serverInstance.listen(3000);
