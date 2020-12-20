const userQueries = {
  me: async (_, __, { req, db }) => {
    return db.User.findById(req.session.userId);
  },
  user: async (_, { id }, { db }) => {
    return db.User.findById(id);
  },
  users: async (_, __, { db }) => {
    return db.User.find({});
  },
};

const userMutations = {
  login: async (_, args, { req, db }) => {
    return {};
  },
  register: async (_, args, { req, db }) => {
    return {};
  },
  logout: async (_, __, { req, res }) => {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);

        res.clearCookie(process.env.SESS_NAME);

        resolve(true);
      });
    });
  },
};

const UserResolver = {
  Query: userQueries,
  Mutation: userMutations,
};

export default UserResolver;
