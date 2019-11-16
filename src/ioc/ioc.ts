import { Container, inject } from 'inversify';
import { autoProvide, makeFluentProvideDecorator } from 'inversify-binding-decorators';

const container = new Container();

const fluentProvider = makeFluentProvideDecorator(container);

const provideSingleton = (identifier: any) => {
    return fluentProvider(identifier)
        .inSingletonScope()
        .done();
};

export { container, autoProvide, provideSingleton, inject };
