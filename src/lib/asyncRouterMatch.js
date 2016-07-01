import React, { Component, PropTypes } from 'react';
import Promise from 'bluebird';
import { each, merge } from 'lodash';
import { RouterContext, Router, match } from 'react-router';

import routes from '../routes';

function createContext(context) {
  const contextTypes = {};
  each(context, (value, key) => {
    contextTypes[key] = PropTypes.any;
  });
  /* eslint-enable */
  class ContextWrapper extends Component {
    static childContextTypes = contextTypes
    static propTypes = {
      children: PropTypes.element.isRequired,
    }

    getChildContext() {
      return context;
    }

    render() {
      return React.Children.only(this.props.children);
    }
  }
  /* eslint-enable */

  return ContextWrapper;
}


export default async function asyncRouterMatch(config, renderAll) {
  return new Promise(async (resolve, reject) => {
    match(merge({}, config, { routes }), async (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
        return;
      }
      try {
        const fetchableComponents = renderProps.components
          .filter((c) => c && c.fetchData)
          .map((c) => c.fetchData(config.store.dispatch));

        await Promise.all(fetchableComponents);
        const context = { ...config.context, store: config.store };
        const R = renderAll ? Router : RouterContext;
        const ContextWrapper = createContext(context);
        resolve(<ContextWrapper><R {...renderProps} /></ContextWrapper>);
      } catch (e) {
        reject(e);
      }
    });
  });
};
