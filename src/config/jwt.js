import expressJwt from 'express-jwt';

import { auth } from '../config';

const jwt = expressJwt({
  secret: auth.jwt.secret,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.method === 'GET' && req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  },
});

export default jwt;
