import redis from 'redis';
import mongoose from 'mongoose';
import RedisStore from 'connect-redis';

import { dbUri, dbOptions } from './config';
import { logger } from './utils';

let retryCounter = 0;

const dbConnection = async () => {
  await mongoose.connect(dbUri, dbOptions, (err) => {
    if (err) {
      if (retryCounter === 5) {
        process.exit(1);
      }

      logger.error('Mongo DB Failed to connect - retrying in 5 sec.. ');
      logger.error(`Mongo DB Error: ${err.message}`);
      setTimeout(dbConnection, 5000);
      retryCounter++;
    }
  });
};

// const redisClient = new redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASS,
// });
// redisClient.unref();
// redisClient.on('error', console.log);

// const store = new RedisStore({ client: redisClient });

export { dbConnection };
