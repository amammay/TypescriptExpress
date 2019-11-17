import 'reflect-metadata';

import * as bodyParser from 'body-parser';
import { config } from 'dotenv';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import morgan from 'morgan';
import * as swagger from 'swagger-express-ts';
import { container } from './ioc/ioc';
// load all injectable entities.
// the @provide() annotation will then automatically register them.
import './ioc/loader';
import { logger } from './logging';

config();

const router = express.Router();
router.use('/api-docs/swagger', express.static('swagger'));
router.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
router.use(swagger.express(
  {
    definition: {
      info: {
        title: 'Typescript Express',
        version: '1.0'
      }
    }
  }
));
const server = new InversifyExpressServer(container, router);
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
const { PORT } = process.env;
serverInstance.listen(PORT);
logger.info(`Server Started on ${PORT} 🚀`);
