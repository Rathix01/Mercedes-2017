import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';

const messageUpdates = new Bacon.Bus(); 

const pushToMessage	= (state) => messageUpdates.push(state);
const includePrevState = (prev, next) => ({ prev: prev.next, next });
const isNotDupilicate = (state) => state.prev.valid !== state.next.valid;
const promoteValid = (state) => R.merge(state, { valid: state.inputState.valid });

const toValidationBus = (state) => {
	const nextBus = new Bacon.Bus();

	nextBus.map( promoteValid )
		   .scan({ prev:{ valid: false }, next:{ valid: false } }, includePrevState)
		   .changes()
		   .debounceImmediate(100)
		   .filter(isNotDupilicate)
		   .map(R.prop("next"))
		   .onValue(pushToMessage)

	return nextBus;
}

const toValidationEvents = (state) => state.component === "ValidationMessage";
const toInputSetUpEvents = (state) => state.event === "component-mount";
const toInputUpdateEvents = (state) => {
	return  state.inputState === undefined ? false : 
			state.event === "component-update" && state.inputState.event !== "component-mount";
} 

const createValidationBusByKey = ( prev, next ) => prev[next.id] === undefined 
												? R.merge(prev, { [next.id]: toValidationBus(next) })
												: prev;

const toStreamByUpdate = (validationStreams, update) => ({ update, stream: validationStreams[update.id] });
const publishValidationToStream = (state) => state.stream.push(state.update);

const events = Actions.filter(toValidationEvents);
const updates = Actions.filter(toInputUpdateEvents);
const validationStreams = events.filter(toInputSetUpEvents).scan({}, createValidationBusByKey);
const updatesAndValidationStreams = Bacon.when([ validationStreams, updates ], toStreamByUpdate);

updatesAndValidationStreams.onValue(publishValidationToStream);

export default messageUpdates;
