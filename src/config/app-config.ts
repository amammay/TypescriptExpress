import * as bodyParser from 'body-parser';
import express from 'express';
import {InversifyExpressServer} from 'inversify-express-utils';
import morgan from 'morgan';
import * as swagger from 'swagger-express-ts';
import {stream} from '../logging';

const applyConfig = (server: InversifyExpressServer) => {
  server.setConfig((app) => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {stream}));
    app.use(bodyParser.json());
    app.use('/api-docs/swagger', express.static('swagger'));
    app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
    app.use(swagger.express(
      {
        definition: {
          info: {
            title: 'Typescript Express',
            version: '1.0'
          }
        }
      }
    ));

  });
};

const applyErrorConfig = (server: InversifyExpressServer) => {
  server.setErrorConfig((app) => {
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      res.status(500).send('Something broke!');
    });
  });
};

export {applyConfig, applyErrorConfig};
