import fs from 'fs';
import { config as setConfig } from 'dotenv';
import { logger } from './utils';

const envFile = `.env.${process.env.NODE_ENV}`;
if (fs.existsSync(envFile)) {
  setConfig({ path: envFile });
  logger.info(`Using ${envFile} file to supply environment variables`);
}

export const {
  PORT,
  NODE_ENV,

  LOG_DIR,
  AUTH_KEYS_DIR,
  AUTH_TOKEN_LIFE,

  FRONTEND_URL,

  REDIS_HOST,
  REDIS_PASS,
  REDIS_PORT,

  DB_USER,
  DB_PASS,
  DB_HOST,
} = process.env;

export const port = PORT || 4000;
export const isDev = NODE_ENV === 'development';

export const logDir = LOG_DIR || 'logs';

export const authKeysDir = AUTH_KEYS_DIR || 'keys';
export const authTokenLife = AUTH_TOKEN_LIFE || '1h';

export const dbUri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
export const dbOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const corsOptions = {
  credentials: true,
  origin: isDev ? '*' : process.env.FRONTEND_URL,
};

export const redisOptions = {
  host: REDIS_HOST,
  pass: REDIS_PASS,
  port: REDIS_PORT,
};
