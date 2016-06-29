import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Login from './components/Login';

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="home" component={Home} />
      <IndexRoute component={Home} />
    </Route>
  </Router>
);
