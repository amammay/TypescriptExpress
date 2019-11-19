import {PingService} from './ping.service';

describe('Ping Service', () => {

  let classUnderTest: PingService;
  beforeEach(() => {
    classUnderTest = new PingService();
  });

  test('Ping Pong', () => {
    expect(classUnderTest.ping()).toBe('pong');
  });
  test('Hello world', async () => {
    expect(await classUnderTest.formatName('world')).toBe('Hello world');
  });
});
