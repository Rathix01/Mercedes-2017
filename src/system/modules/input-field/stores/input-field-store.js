import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const isInputFieldComponent = (state) => state.component === "InputField";
const isEvent = R.curry((shouldBe, state) => state.componentevent === shouldBe);
const publishToInput = (state) => publish(state.id + "Input", { value: state.value });
const publishToLabel = (state) => publish(state.id + "Label", { value: state.label });
const publishToLabelVisibility = (state) => publish(state.id + "LabelVisibility", { display: state.showLabel === false ? false : true });
const toValue = (state) => R.merge( state, { value: toExistingOrEmptyValue(state) });
const toExistingOrEmptyValue = (state) => state.value === undefined ? "" : state.value;
const toAllFields = (existing, next) => R.merge(existing, { [next.id]: next });

const inputFieldEvents = Actions.filter(isInputFieldComponent);
const inputFieldUpdateEvents = inputFieldEvents.filter(isEvent("component-update"));
const inputFieldMountEvents = inputFieldEvents.filter(isEvent("component-mount"));
const allFields = inputFieldMountEvents.scan({}, toAllFields);
inputFieldMountEvents.onValue(publishToLabel);
inputFieldMountEvents.map(toValue).onValue(publishToInput);
inputFieldUpdateEvents.map(toValue).onValue(publishToInput);

exports.inputFieldMountEvents = inputFieldMountEvents;
exports.inputFieldUpdateEvents = inputFieldUpdateEvents;
exports.allFields = allFields;

export default inputFieldEvents
