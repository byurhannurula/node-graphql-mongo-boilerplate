import authService from '../services/auth.service';

const checkAuth = (req, res, next) => {
  // Format of token: "Authorization: Bearer [token]" or "token: [token]"
  let tokenToVerify;

  const authHeader = req.header('Authorization');
  if (authHeader) {
    const parts = authHeader.split(' ');

    if (parts.length === 2) {
      const [scheme, credentials] = parts;

      if (/^(B|b)earer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res
          .status(401)
          .json({ msg: 'Invalid format for Authorization: Bearer [token]' });
      }
    } else {
      return res
        .status(401)
        .json({ msg: 'Invalid format for Authorization: Bearer [token]' });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: 'No Authorization was found' });
  }

  return authService.verify(tokenToVerify, (err, token) => {
    if (err) {
      return res.status(401).json({ err });
    }

    req.token = token;
    req.userId = token.payload;
    return next();
  });
};

export { checkAuth };
