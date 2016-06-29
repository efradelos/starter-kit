import ReactDOM from 'react-dom';

import asyncRouterMatch from './lib/asyncRouterMatch';
import configureStore from './redux/store/configureStore';
import routes from './routes';

async function route() {
  const matchArgs = {
    history: routes.props.history,
    store: configureStore(window.__INITIAL_STATE__), //eslint-disable-line no-underscore-dangle
  };
  const Element = await asyncRouterMatch(matchArgs, true);

  ReactDOM.render(Element, document.getElementById('app'));
}

route();
