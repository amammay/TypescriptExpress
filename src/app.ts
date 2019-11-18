import './config/env';

import {server} from './config/container';
import {logger} from './logging';

const serverInstance = server.build();
const {PORT} = process.env;
serverInstance.listen(PORT);
logger.info(`Server Started on ${PORT} 🚀`);
