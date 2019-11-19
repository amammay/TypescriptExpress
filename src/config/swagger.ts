import express from 'express';
import * as swagger from 'swagger-express-ts';

export const addSwagger = (app: express.Application) => {
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
};
