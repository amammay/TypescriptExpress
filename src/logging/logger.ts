import winston from 'winston';

const loggerCreator = (id: string) => {
  return winston.createLogger({
    level: 'info',
    defaultMeta: { logRoot: id },
    levels: winston.config.syslog.levels,
    transports: []
  });
};

const logger = loggerCreator('general');

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    level: 'debug',
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
} else {
  logger.add(new winston.transports.Console({
    level: 'info',
    format: winston.format.json()
  }));
}
const stream = {
  write: (message: any) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
};

export { logger, stream };
