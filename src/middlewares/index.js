const applyExpressMiddlewares = (app) => {
  // Handle redis connection lost
  app.use((req, _, next) => {
    if (!req.session) {
      return next(new Error('Redis connection lost!'));
    }
    return next();
  });

  // Catch 404, send to Error Handler
  // app.use((_, __, next) => next(new NotFoundError()));

  // Middleware Error Handler
  // app.use((err, _, res, __) => {
  //   if (err instanceof ApiError) {
  //     ApiError.handle(err, res);
  //   } else {
  //     if (isDev) {
  //       logger.error(err);
  //       return res.status(500).send(err.message);
  //     }
  //     ApiError.handle(new InternalError(), res);
  //   }
  // });
};

export default applyExpressMiddlewares;
