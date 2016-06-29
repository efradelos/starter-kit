import Cookies from 'js-cookie';

import { LOGIN_SUCCESS, LOGIN_FAIL } from '../actions/login';
import { browserHistory } from 'react-router';

export default (state = { email: 'efradelos' }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      browserHistory.push('/');
      return Object.assign({ }, state, action.payload);
    case LOGIN_FAIL:
      if (action.payload.status === 401) {
        // TODO: Make Materialize an external module
        // eslint-disable-next-line no-undef
        Materialize.toast('Invalid username or password', 4000);
      }
      return state;
    default:
      return state;
  }
};
