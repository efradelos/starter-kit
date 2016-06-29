import React from 'react';
import Promise from 'bluebird';
import merge from 'lodash/merge';
import { Provider } from 'react-redux';
import { RouterContext, Router, match } from 'react-router';

import routes from '../routes';

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
          .map((c) => c.fetchData());

        await Promise.all(fetchableComponents);
        const R = renderAll ? Router : RouterContext;
        resolve(<Provider store={config.store}><R {...renderProps} /></Provider>);
      } catch (e) {
        reject(e);
      }
    });
  });
};
