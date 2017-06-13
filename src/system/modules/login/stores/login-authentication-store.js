import Bacon from 'baconjs';
import R from 'ramda';
import Q from 'q';
import publish from '../../../stores/state-store';
import { validLoginAttempt } from './login-form-store';

const isValidUser = (state) => state.email.event.value !== "" && state.password.event.value !== "";

// Note. The fetch API is fairly new. Polyfill will be needed.

const toUserRequest = (state) => {
	// var p = fetch('http://test.volo.nz/api/customer/login', 
 //    { method: 'POST',
 //      headers: {
 //      'Accept': 'application/json',
 //      'Content-Type': 'application/json',
 //    },
 //    body: JSON.stringify({
 //      username: state.email.event.value,
 //      password: state.password.event.value,
 //    }) 
 //  });

 //  return Bacon.fromPromise(p);
};

const toTestUserRequest = (state) => {
  const d = Q.defer();

  setTimeout(() => {
    
  }, 2000)
}


const loginRequest = validLoginAttempt.log('this').flatMap(toTestUserRequest)
const validLogin = loginRequest.filter((state) => state.ok === true);
const invalidLogin = loginRequest.filter((state) => state.ok !== true);

module.exports = { validLogin, invalidLogin };