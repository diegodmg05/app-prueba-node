import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

// Formato tipo Apache
const apacheFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), apacheFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app.log' }) // Guarda en archivo
  ],
});