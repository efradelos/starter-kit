import { defaults } from 'lodash';
import { CALL_API } from 'redux-api-middleware';
// TODO: Can't have config available in client!!!
import { host } from '../../config';

function localUrl(url) {
  if (process.env.BROWSER) return (url);
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${host}${url}`;
}

export default function callApi(endpoint, evt, options = {}) {
  return (dispatch, getState) => {
    const profile = getState().profile;
    const base = {
      endpoint: localUrl(endpoint),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${profile.token}`,
      },
      types: [
        evt,
        `${evt}_SUCCESS`,
        `${evt}_FAIL`,
      ],
    };
    return dispatch({
      [CALL_API]: defaults(options, base),
    });
  };
}
