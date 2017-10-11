import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import M from 'moment';

const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));
function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validation = {
	notEmpty: (state) => {
		return state.event && state.event.targetValue !== undefined	
				? state.event.targetValue !== undefined && state.event.targetValue.length > 0
				: state.value !== undefined && state.value.length > 0
	},
	notNumber: (state) => state.value !== undefined && !isValidNumber(parseInt(state.value)),
	isNumber: (state) => state.value !== undefined && isValidNumber(parseInt(state.value)),
	isDate: (state) => {
		return M(state.value,'YYYY/MM/DD', true).isValid()
	},
	isEmail: (state) => state.value !== undefined && state.value !== "" && isValidEmail(state.value),
};

const getValue = (state) => state.event && state.event.targetValue ? state.event.targetValue : state.value;
const isQuestionField = (state) => state.isQuestion === true && state.componentEvent === "component-update";
const toCleanValue = (state) => state.event !== undefined && state.event !== null
									? R.merge(state, { value: getValue(state).replace(/^\s+|\s+$/g, '') })
									: state;

const validate = R.curry((state, isValid, validationType) => isValid === false ? false : validation[validationType](state));
const toIsValid = (state) => ({ ...state, valid: R.reduce(validate(state), true, R.keys(state.validations) || []) });
const validShouldBe = R.curry((shouldBe, state) => state.valid === shouldBe);
const isNotListenerAction = (state) => state.component !== "StateListener";
const publishValue = (state) => publish(state.id, { value: state.event.targetValue });

const processDelay = (state) => {
	return state.errorDelay !== undefined && state.valid === false
			? Bacon.once(state).debounce(state.errorDelay)
			: Bacon.once(state);
}

const userFieldActions = Actions.filter(isQuestionField).map(toCleanValue);
const validatedFields = userFieldActions.map(toIsValid);
const validFields = validatedFields.filter(validShouldBe(true));
const invalidFields = validatedFields.filter(validShouldBe(false));

validatedFields.flatMapLatest(processDelay).onValue((state) => publish(`${state.rootId}InputValidation`, {inputState:state}))
//userFieldActions.filter(isNotListenerAction).onValue(publishValue);

//userFieldActions.log('-->')