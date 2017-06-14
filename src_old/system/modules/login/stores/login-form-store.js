import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toActionType = R.curry((key, state) => state.id === key);
const getValue = (state) => ({ id: state.id, value: state.event.target.value });
const shouldHaveValue = R.curry((shouldBe, state) => ((state.value && state.value !== "") === shouldBe));

const loginEmailInputActions = Actions.filter(toActionType("LoginUsernameInput")).log("E");
const loginPasswordInputActions = Actions.filter(toActionType("LoginPasswordInput")).log("P")
const loginSubmitAttempt = Actions.filter(toActionType("LoginForm")).log("Login Attempt").toEventStream();

const loginEmail = loginEmailInputActions.map(getValue).log("LoginEmail");
const loginPassword = loginPasswordInputActions.map(getValue).log("LoginPassword");

const validEmail = loginEmail.filter(shouldHaveValue(true));
const invalidEmail = loginEmail.filter(shouldHaveValue(false));

const validPassword = loginPassword.filter(shouldHaveValue(true));
const invalidPassword= loginPassword.filter(shouldHaveValue(false));

//const validLogin = ()

//Bacon.when([ loginEmailInputActions, loginPasswordInputActions, loginSubmitAttempt ], toLoginAttempt)