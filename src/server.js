import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import express from 'express';
import PrettyError from 'pretty-error';
import path from 'path';
import ReactDOM from 'react-dom/server';

import { cookieJwt, headerJwt } from './config/jwt';
import assets from './assets'; // eslint-disable-line import/no-unresolved
import asyncRouterMatch from './lib/asyncRouterMatch';
import { port, host, auth } from './config';
import configureStore from './redux/store/configureStore';

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(auth.cookies.secret));
app.use(bodyParser.json());

import User from './data/User';

app.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

app.put('/login', async (req, res) => {
  const user = await User.verify(req.body.email, req.body.password);
  if (user) {
    res.cookie('token', user.token, { httpOnly: true, signed: true });
    res.json(user);
  } else {
    res.status(401).send('Invalid username or password');
  }
});

app.use('/api/*', headerJwt);

import Post from './data/Post';
import { groupBy, map, pick } from 'lodash';

app.get('/api/posts', async (req, res) => {
  const posts = await Post
    .getJoin({ author: true })
    .orderBy('created_at')
    .map((post) => post.merge({ unread: post('read_by').contains(req.user.id).not() }))
    .without('read_by')
    .run();

  const conversations = groupBy(posts, 'conversation_id');
  res.json(map(conversations, (ps, key) => ({ id: key, posts: ps })));
});

app.put('/api/posts', async (req, res, next) => {
  try {
    const postAttrs = pick(req.body, 'conversation_id', 'content');
    const authorId = req.body.author.id;
    const post = new Post(postAttrs);
    post.author = await User.get(authorId);
    post.read_by = [authorId];
    res.json(await post.saveAll());
  } catch (e) {
    next(e);
  }
});

app.get('*', cookieJwt.unless({ path: ['/login'] }), async (req, res, next) => {
  try {
    const css = [];
    // eslint-disable-next-line no-underscore-dangle
    const context = { insertCss: (styles) => css.push(styles._getCss()) };
    const store = configureStore({ profile: req.user ? await User.get(req.user.id) : {} });
    const Element = await asyncRouterMatch({ location: req.url, store, context });
    const template = require('./views/index.hbs'); // eslint-disable-line global-require
    const data = {
      body: ReactDOM.renderToString(Element),
      js: assets.main.js,
      css: css.join(''),
      state: JSON.stringify(store.getState()),
    };
    res.status(200).send(template(data));
  } catch (error) {
    next(error);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (req.method === 'GET' && err.name === 'UnauthorizedError') {
    res.redirect('/login');
    return;
  }
  console.log(pe.render(err)); // eslint-disable-line no-console
  const template = require('./views/error.hbs'); // eslint-disable-line global-require
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send(template({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  }));
});

server.listen(port, () => {
  console.log(`The server is running at ${host}/`); // eslint-disable-line no-console
});
