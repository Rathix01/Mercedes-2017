import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toActionType = R.curry((key, state) => state.id === key);
const toValueAndID = (state) => ({ id: state.id, value: state.event.value });
const toLoginAttempt = (email, password, submit) => ({ email, password });

// right now, our valid email and password just need to be non-zero length strings.
// email format validation and min password length should trigger error
const toValidAttempt = (state) => (( state.email.event.value && state.email.event.value.length > 0 ) && 
								  ( state.password.event.value && state.password.event.value.length > 0 ));

const loginEmailInputActions = Actions.filter(toActionType("LoginUsernameInput"))//.log("E");
const loginPasswordInputActions = Actions.filter(toActionType("LoginPasswordInput"))//.log("P")
const loginSubmitAttempt = Actions.filter(toActionType("LoginForm"));

const loginEmail = loginEmailInputActions.map(toValueAndID);
const loginPassword = loginPasswordInputActions.map(toValueAndID);

const loginAttempt = Bacon.when([ loginEmailInputActions.toProperty(), 
			 loginPasswordInputActions.toProperty(), 
			 loginSubmitAttempt.toEventStream() ], toLoginAttempt)//.log('login attempt');

const validLoginAttempt = loginAttempt.filter(toValidAttempt)//.log('so valid');

// set initial visibility for the form...
Bacon.once({ display: true }).debounce(500).onValue(publish("LoginVisibility"));

module.exports = { validLoginAttempt };