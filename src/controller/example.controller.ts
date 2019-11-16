import express from 'express';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/test')
export class ExampleController {
    @httpGet('/')
    public async func1(req: express.Request, res: express.Response) {
        return 'hi';
    }
}
