
import Promise from 'bluebird';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export default function login(email, password) {
  return async (dispatch) => {
    dispatch({
      type: LOGIN,
      email,
      password,
    });
    await Promise.delay(2000);
    dispatch({ type: LOGIN_SUCCESS, profile: { email, token: 'xyz' } });
    return 'yes';
  };
}
