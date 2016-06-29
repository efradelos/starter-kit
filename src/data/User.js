import { head } from 'lodash';
import bcrypt from 'bcrypt';
import Promise from 'bluebird';
import jsonwebtoken from 'jsonwebtoken';

import { auth } from '../config';
import thinky from '../config/thinky';

const type = thinky.type;

const hash = Promise.promisify(bcrypt.hash);
const compare = Promise.promisify(bcrypt.compare);

// Create a model - the table is automatically created
const User = thinky.createModel('users', {
  id: type.string(),
  email: type.string().required(),
  password: type.string().required(),
  first_name: type.string().optional(),
  last_name: type.string().optional(),
  token: type.virtual().default(function token() {
    return jsonwebtoken.sign({ email: this.email }, auth.jwt.secret);
  }),
});

User.define('setPassword', async function setPassword(password) {
  this.password = await hash(password, 10);
  return this.save();
});

User.defineStatic('verify', async function verify(email, password) {
  const user = head(await User.filter({ email }));
  if (!user) return user;

  if (await compare(password, user.password)) return user;

  return null;
});

export default User;
