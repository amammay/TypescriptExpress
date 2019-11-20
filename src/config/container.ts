import 'reflect-metadata';

import {Container, inject} from 'inversify';
import {autoProvide, makeFluentProvideDecorator} from 'inversify-binding-decorators';
import {InversifyExpressServer} from 'inversify-express-utils';
import {applyConfig, applyErrorConfig} from './app-config';

const container = new Container();
const fluentProvider = makeFluentProvideDecorator(container);
const provide = (identifier: any) => {
  return fluentProvider(identifier).inTransientScope().done();
};

const server = new InversifyExpressServer(container);
applyConfig(server);
applyErrorConfig(server);
export {server, autoProvide, provide, inject};
