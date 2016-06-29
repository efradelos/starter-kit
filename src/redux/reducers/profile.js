import { LOGIN_SUCCESS } from '../actions/login';

export default (state = { email: 'efradelos' }, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({ }, state, action.profile);
    default:
      return state;
  }
};
