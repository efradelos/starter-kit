import expressJwt from 'express-jwt';

import { auth } from '../config';

export const headerJwt = expressJwt({
  secret: auth.jwt.secret,
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }

    return null;
  },
});

export const cookieJwt = expressJwt({
  secret: auth.jwt.secret,
  getToken: (req) => {
    if (req.method === 'GET' && req.signedCookies && req.signedCookies.token) {
      return req.signedCookies.token;
    }
    return null;
  },
});

export default { cookieJwt, headerJwt };
