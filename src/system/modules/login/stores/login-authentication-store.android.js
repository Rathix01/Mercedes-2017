import Bacon from 'baconjs';
import R from 'ramda';
import Q from 'q';
import publish from '../../../stores/state-store';
import { validLoginAttempt } from './login-form-store';

const isValidUser = (state) => state.email.event.value !== "" && state.password.event.value !== "";

const toUserRequest = (state) => {
	var p = fetch('http://test.volo.nz/api/customer/login', { method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: state.email.event.value,
    password: state.password.event.value,
  }) })

  return Bacon.fromPromise(p);
}

const loginRequest = validLoginAttempt.log('this').flatMap(toUserRequest)
const validLogin = loginRequest.filter((state) => state.ok === true);
const invalidLogin = loginRequest.filter((state) => state.ok !== true);

validLogin.log('///')
invalidLogin.log('???')

module.exports = { validLogin, invalidLogin };