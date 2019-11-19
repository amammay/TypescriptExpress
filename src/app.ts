// IMPORT ORDER IS IMPORTANT, WE WANT TO MAKE SURE THE GROUND IS SETTLED WITH LOGGING AND ENV VALUES
// BEFORE BOOTSTRAPPING THE APPLICATION
import './config/env';
import {logger} from './logging';

import {server} from './config/container';
import './ioc/loader';

const serverInstance = server.build();
const {PORT} = process.env;
serverInstance.listen(PORT);
logger.info(`Server Started on ${PORT} 🚀`);
