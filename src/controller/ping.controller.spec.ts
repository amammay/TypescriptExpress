import express from 'express';
import {PingController} from './ping.controller';

describe('Ping Controller', () => {
  test('ping pong', () => {
    const controller = new PingController();
    expect(controller.pong({} as express.Request, {} as express.Response)).toBe('pong');
  });

  test('test method', () => {
    const controller = new PingController();
    expect(controller.test({query: {name: 'alex'}} as express.Request, {} as express.Response)).toBe('Hello alex');
  });

});
