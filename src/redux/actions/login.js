import callApi from './api';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export default function login(email, password) {
  return callApi('/login', LOGIN, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}
