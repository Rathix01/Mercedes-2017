import Bacon from 'baconjs';
import R from 'ramda';
import OWasp from 'owasp-password-strength-test'
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { weak, strong } from '../styles';

OWasp.config({
  allowPassphrases       : true,
  maxLength              : 128,
  minLength              : 8,
  minPhraseLength        : 12,
  minOptionalTestsToPass : 4,
});

function hasValue( obj ) {
  return obj && obj.value !== "";
}

function toPasswordProperty( inputs ) {

  var pwExists = hasValue(inputs.password);
  var pwMatchesConfirmation =  inputs.password.value === inputs.confirm.value;
  var pwIsLongEnough = inputs.password.value && inputs.password.value.length >= 12;

  return {
    value: inputs.password.value,
    valid: pwExists && pwMatchesConfirmation && pwIsLongEnough,
    invalidReason: !pwIsLongEnough ? "length" : !pwMatchesConfirmation ? "mismatch" : "",
    matches: pwMatchesConfirmation,
    key: inputs.password.passwordRoot
  }
}

function toOWaspTest( state ) {
  return R.merge({ key: state.passwordRoot }, OWasp.test( state.value ));
}

function toIsStrongMessage( test ) {
  return test.strong ?  { value: "Password Strength: Strong", className: strong, key: test.key }
                     :  { value: "Password Strength: Weak", className: weak, key: test.key }
}

function toPasswordsMatchMessage( password ) {
  return password.matches ? { value: "Passwords Match", className: strong, key: password.key }
                        : { value: "Passwords do not match", className: weak, key: password.key }
}

function isAtLeast3Characters( state ) {
  return state.value.length >= 3;
}

function bothFieldsPopulated(inputs) { 
  return hasValue(inputs.password) && hasValue(inputs.confirm) 
}

function toPassword( password, submit ) {
  return password;
}

function isPasswordInit(state) {
  return state.component === "InputSignUpPasswords";
}

const publishMatch = (state) => publish(state.key + "MatchFeedback", R.omit("key", state));
const publishStrength = (state) => publish(state.key + "StrengthFeedback", R.omit("key", state));
const publishMatchVisibility = (state) => publish(state.key + "MatchVisibility", { display: true });
const publishStrengthVisibility = (state) => publish(state.key + "StrengthVisibility", { display: true });

const promoteValue = (state) => ({ ...state, value: state.event.targetValue });
const publishComponentValue = (state) => publish(state.id, { value: state.value });
const toIsRepeatField = R.curry((shouldBe, state) => (R.contains("Repeat", state.id) > 0) === shouldBe);
const publishPasswordValue = (state) => publish(`${state.key}Updates`, { ...state, id: state.key, isQuestion: true })

const publishInputsVisbility = R.curry((shouldBe, state) => publish(`${state.id}InputVisibility`, { display:shouldBe }));
const publishMessageVisibility = R.curry((shouldBe, state) => publish(`${state.id}MessageVisibility`, { display:shouldBe }));
const toUpdatePassword = (state) => state.isPasswordUpdateButton === true;
const toUpdateView = (state) => ({ id: state.rootId });

const passwordInit = Actions.filter(isPasswordInit).filter(hasValue);
const passwordUpdate = Actions.filter(toUpdatePassword).log('zz').map(toUpdateView)

passwordInit.onValue(publishInputsVisbility(false))
passwordInit.onValue(publishMessageVisibility(true))
passwordUpdate.onValue(publishInputsVisbility(true))
passwordUpdate.onValue(publishMessageVisibility(false))

const passwordFieldEvents = Actions.filter(R.prop("isSignUpPassword")).map(promoteValue)
passwordFieldEvents.onValue(publishComponentValue);

const password = passwordFieldEvents.filter(toIsRepeatField(false)).toProperty({ value: "" })
const confirm = passwordFieldEvents.filter(toIsRepeatField(true)).toProperty({ value: "" })

const passwordTemplate = Bacon.combineTemplate( {
    password: password,
    confirm: confirm,
});

const passwordStream = passwordTemplate.debounce(200).map(toPasswordProperty).changes();
const passwordCompare = passwordTemplate.debounce(200).filter(bothFieldsPopulated).map(toPasswordProperty);


passwordCompare.map(toPasswordsMatchMessage).onValue(publishMatch);
passwordCompare.onValue(publishMatchVisibility);

const passwordStrengthTest = password.debounce(600).map(toOWaspTest);
passwordStrengthTest.map(toIsStrongMessage).onValue(publishStrength);
passwordStrengthTest.onValue(publishStrengthVisibility);

passwordStream.onValue(publishPasswordValue)