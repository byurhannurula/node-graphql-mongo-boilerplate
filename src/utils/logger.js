import fs from 'fs';
import path from 'path';
import { createLogger, transports, format } from 'winston';
import { isDev, logDir } from '../config';

let dir = logDir;
if (!dir) dir = path.resolve('logs');

// Create directory if it is not present
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const customLogFormat = format.printf((info) => {
  const { level, message, timestamp, ...args } = info;

  const dateTime = timestamp.slice(0, 19).replace('T', ' ');
  const extraArgs =
    Object.keys(args).length > 0 ? JSON.stringify(args, null, 4) : '';

  return `[${level}][${dateTime}]: ${message} ${extraArgs}`;
});

const logLevel = isDev ? 'debug' : 'error';

export default createLogger({
  format: format.combine(
    format.errors({ stack: true }),
    format((info) => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.prettyPrint(),
    format.timestamp(),
    format.colorize(),
    format.align(),
    customLogFormat,
  ),
  transports: [
    new transports.File({
      format: format.combine(format.prettyPrint(), format.json()),
      filename: `${dir}/logs.log`,
      maxsize: 1024 * 1024 * 50,
      level: logLevel,
    }),
    new transports.Console({}),
  ],
  exceptionHandlers: [
    new transports.File({
      format: format.combine(format.prettyPrint(), format.json()),
      filename: `${dir}/exceptions.log`,
      maxsize: 1024 * 1024 * 50,
      level: logLevel,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});
