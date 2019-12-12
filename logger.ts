import winston from 'winston';

export default winston.createLogger({
  level: 'debug',
  format: winston.format.colorize(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ level: 'debug', handleExceptions: true  })
  ]
});
