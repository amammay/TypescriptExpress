/**
 * IMPORT ORDER IS IMPORTANT
 * WE WANT TO MAKE SURE THE GROUND IS SETTLED WITH LOGGING AND ENV VALUES
 * BEFORE BOOTSTRAPPING THE APPLICATION
 */
import './config/env';

// gets the logger, and streamer ready
import {logger} from './logging';

// app server
import {server} from './config/container';

// last item to to get imported, this is to add all the controller to the container
import './ioc/loader';

const serverInstance = server.build();
const {PORT} = process.env;
serverInstance.listen(PORT);
logger.info(`Server Started on ${PORT} 🚀`);
