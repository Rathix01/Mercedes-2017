import Bacon from 'baconjs';
import R from 'ramda';
// import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

const toItemToEdit = (state) => state.component === "DynamicFormAdminItemToEdit" && state.componentEvent === "component-update";
const toValue = R.curry((key, state) => {
	return ({ value: state[key], targetID: state.uniqueId })
});

const toOptions = (state) => ({ value: R.map((i) => i.text, state.itemState.items || []).join(",")  });
const toValidations = (state) => ({ value: (R.keys(state.validations) || []) .join(",") })
const toTabChangeAction = (state) => state.component === "TabPanelsAndLabels";
const toTabChange = (tab, action) => {
	return ({ tab: "Edit", valid: tab.event === undefined || !(tab.event.target.textContent === "Rules") })
}
const isTab = (state) => state.valid === true;

const itemToEditAction = Actions.filter(toItemToEdit).toProperty();
const tabChangeAction = Actions.filter(toTabChangeAction)

itemToEditAction.onValue(publish("DynamicFormAdminEditForm"));
itemToEditAction.map(toValue("componentType")).onValue(publish("ComponentTypeSelect"));
itemToEditAction.map(toValue("text")).onValue(publish("ComponentText"));
itemToEditAction.map(toValue("title")).onValue(publish("ComponentTitle"));
itemToEditAction.map(toValue("page")).onValue(publish("ComponentPage"));
itemToEditAction.map(toValue("inputType")).onValue(publish("ComponentInputType"));
itemToEditAction.map(toOptions).onValue(publish("ComponentOptions"));
itemToEditAction.map(toValidations).onValue(publish("ValidationOptions"));

itemToEditAction.map({ display: true }).onValue(publish("ItemToEditVisibility"));

// force change for tabs if the edit button is pressed and the rules tab is not the open tab.
Bacon.when([ tabChangeAction.toProperty({}), itemToEditAction.toEventStream() ], toTabChange)
	.filter(isTab)
	.map(R.prop("tab"))
	.onValue(publish("TabChangeListener"))

itemToEditAction.map(R.prop("validations"));

module.exports = {
	itemToEdit: itemToEditAction
}
