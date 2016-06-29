import callApi from './api';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export default function login(email, password) {
  return callApi('/login', LOGIN, {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ email, password }),
  });
}
