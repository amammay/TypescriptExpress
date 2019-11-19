import express from 'express';
import {PingController} from './ping.controller';

describe('Ping Controller', () => {
  let fakeService: any = null;

  beforeEach(() => {
    fakeService = {
      ping() {
        return 'pong';
      },
      formatName(name: string) {
        return `Hello ${name}`;
      }
    };
  });

  test('ping pong', () => {
    const controller = new PingController(fakeService);
    expect(controller.ping({} as express.Request, {} as express.Response)).toBe('pong');
  });

  test('test method', async () => {
    const controller = new PingController(fakeService);
    expect(await controller.test({query: {name: 'alex'}} as express.Request, {} as express.Response))
      .toBe('Hello alex');
  });

});
