import createApp from './app';
import { port } from './config';
import { logger } from './utils';
import { dbConnection } from './db-connection';
import applyExpressMiddlewares from './middlewares';

const startServer = async () => {
  // await dbConnection();

  const app = createApp();

  applyExpressMiddlewares(app);

  app.listen(port, () => {
    logger.info(`🚀 Server is running on http://localhost:${port}/graphql`);
  });
};

startServer().catch((err) => logger.warn(err));

process.on('uncaughtException', (e) => logger.warn(e));
