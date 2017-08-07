import Bacon from 'baconjs';
import R from 'ramda';
// import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

const toItemToEdit = (state) => state.component === "DynamicFormAdminItemToEdit" && state.componentEvent === "component-update";
const toValue = R.curry((key, state) => {
	return ({ value: state[key], targetID: state.uniqueId })
});

const itemToEditAction = Actions.filter(toItemToEdit).toProperty();

itemToEditAction.onValue(publish("DynamicFormAdminEditForm"));
itemToEditAction.map(toValue("componentType")).onValue(publish("ComponentTypeSelect"));
itemToEditAction.map(toValue("text")).onValue(publish("ComponentText"));
itemToEditAction.map(toValue("title")).onValue(publish("ComponentTitle"));
itemToEditAction.map(toValue("page")).onValue(publish("ComponentPage"));
itemToEditAction.map(toValue("inputType")).onValue(publish("ComponentInputType"));

itemToEditAction.map({ display: true }).onValue(publish("ItemToEditVisibility"));

itemToEditAction.map({ tab: "Edit" }).onValue(publish("TabChangeListener"))

module.exports = {
	itemToEdit: itemToEditAction
}
