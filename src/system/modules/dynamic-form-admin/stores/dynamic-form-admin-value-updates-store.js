import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import M from 'moment';

const isNotListenerAction = (state) => state.id !== "RulesListener";
const hasRules = (state) => state.rules !== undefined && state.rules.length > 0;
const includeOriginComponent = (state) => ({  ...state, originComponent: state });
const getValue = (state) => state.event && state.event.targetValue ? state.event.targetValue : state.value;
const isQuestionField = (state) => state.isQuestion === true && state.componentEvent === "component-update";
const toCleanValue = (state) => state.event !== undefined && state.event !== null
									? R.merge(state, { value: getValue(state).replace(/^\s+|\s+$/g, '') })
									: state;

Actions.filter(isQuestionField)
	.map(includeOriginComponent)
	.map(toCleanValue)
	.filter(hasRules)
	.filter(isNotListenerAction)
	.onValue(publish("RulesListener"));
