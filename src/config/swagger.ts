import express from 'express';
import * as swagger from 'swagger-express-ts';

export const addSwagger = (router: express.Router) => {
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
};
