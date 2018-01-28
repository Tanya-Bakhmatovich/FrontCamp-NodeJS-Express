const winston = require('winston');
const { combine, timestamp, printf } = winston.format;

const myFormat = printf(info => `${info.message}`);

const logger = winston.createLogger({
  level: 'info',
  format: myFormat,
  transports: [
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

module.exports = logger;
