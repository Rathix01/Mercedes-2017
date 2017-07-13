import Bacon from 'baconjs';
import R from 'ramda';
// import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

const toItemToEdit = (state) => state.component === "DynamicFormAdminItemToEdit"
const toValue = R.curry((key, state) => ({ value: state[key], targetID: state.uniqueID }));

const itemToEditAction = Actions.filter(toItemToEdit).toProperty();

itemToEditAction.onValue(publish("DynamicFormAdminEditForm"));
itemToEditAction.map(toValue("componentType")).onValue(publish("ComponentTypeSelect"));
itemToEditAction.map(toValue("text")).onValue(publish("ComponentText"));
itemToEditAction.map(toValue("title")).onValue(publish("ComponentTitle"));
itemToEditAction.map(toValue("inputType")).onValue(publish("ComponentInputSelect"));



