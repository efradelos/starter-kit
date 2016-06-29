import { CALL_API } from 'redux-api-middleware';
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

export function callApi(endpoint, event) {
  return (dispatch, getState) => {
    const profile = getState().profile;
    return dispatch({
      [CALL_API]: {
        endpoint: localUrl(`/api/${endpoint}`),
        method: 'GET',
        headers: { Authorization: `Bearer ${profile.token}` },
        types: [
          event,
          `${event}_SUCCESS`
          `${event}_FAIL`,
        ],
      },
    });
  };
}
