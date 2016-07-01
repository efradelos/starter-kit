import ReactDOM from 'react-dom';

import asyncRouterMatch from './lib/asyncRouterMatch';
import configureStore from './redux/store/configureStore';
import routes from './routes';

async function route() {
  /* eslint-disable no-underscore-dangle */
  const matchArgs = {
    history: routes.props.history,
    store: configureStore(window.__INITIAL_STATE__),
    context: { insertCss: (styles) => styles._insertCss() },
  };
  /* eslint-enable no-underscore-dangle */

  const Element = await asyncRouterMatch(matchArgs, true);

  ReactDOM.render(Element, document.getElementById('app'));
}

route();
