import ReactDOM from 'react-dom';

import asyncRouterMatch from './lib/asyncRouterMatch';
import routes from './routes';

const matchArgs = {
  history: routes.props.history,
  routes: routes.props.children,
};

async function route() {
  const Element = await asyncRouterMatch(matchArgs);

  ReactDOM.render(Element, document.getElementById('app'));
}

route();
