import {provide} from '../config/container';
import {IocTypes} from '../ioc/types';

@provide(IocTypes.PingService)
export class PingService {

  public async formatName(name: string): Promise<string> {
    return `Hello ${name}`;
  }

  public ping(): string {
    return 'pong';
  }

}
