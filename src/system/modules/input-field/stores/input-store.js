import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { inputFieldMountEvents, inputFieldUpdateEvents } from './input-field-store'

const isInputComponent = R.curry((fieldState, inputState) => inputState.id.indexOf(fieldState.id + "Input") !== -1);
const isNotCustom = (state) => state.event.target !== undefined || state.event !== "component-update"
const toInputEvents = (state) => Actions.filter(isInputComponent(state)).filter(isNotCustom);
const toInputValue = (state) => R.merge(state, { value: state.event.target.value });
const publishToInput = (state) => publish(state.id, state);
const removeEventProp = R.omit("event");
const toExistingOrEmptyValue = (state) => R.merge(state, { value: state.value === undefined ? "" : state.value });

const inputEvents = inputFieldMountEvents.flatMap(toInputEvents);
const inputUpdates = inputEvents.map(toInputValue).map(removeEventProp);
const mountValues = inputFieldMountEvents.map(toExistingOrEmptyValue)
const externalUpdates = inputFieldUpdateEvents;
const updates = externalUpdates.merge(mountValues).merge(inputUpdates);

inputUpdates.onValue(publishToInput);

export default updates;