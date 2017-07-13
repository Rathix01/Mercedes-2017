import Bacon from 'baconjs';
import R from 'ramda';
// import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

const toItemEdit = (state) => state.component === "DynamicFormAdminEditForm"
const toItemByID = R.curry((id, state) => state.id === id);
const toTypeSelectData = (state) => ({ type: state.event.target.value, targetID: state.targetID })
const toUpdateData = (type, title, text, edit) => ({ nextUpdate: { type:type.type, 
																   title:title.value, 
																   text: text.value, 
																   targetID: type.targetID || title.targetID || text.targetID } });
const toValue = (state) => ({ value: state.event.target.value });
const toTextValue = (state) => ({ value: state.event.target.value, targetID: state.targetID });

const toCleanProps = R.curry((state, obj, key) => {
	return R.merge(obj, { [key]: state[key] });
});
const toCleanUpdate = (state) => {
	var cleanKeys =  R.filter((k) => state.nextUpdate[k] !== undefined, R.keys(state.nextUpdate));
	var cleanProps = R.reduce(toCleanProps(state.nextUpdate), {}, cleanKeys);
	return R.merge(state, { nextUpdate: cleanProps });
}

const editAction = Actions.filter(toItemEdit);
const itemTypeSelectAction = Actions.filter(toItemByID("ComponentTypeSelect"));
const newTitle = Actions.filter(toItemByID("ComponentTitle")).map(toTextValue);
const newText = Actions.filter(toItemByID("ComponentText")).map(toTextValue);

const selectValue = itemTypeSelectAction.map(toValue);
const selectData = itemTypeSelectAction.map(toTypeSelectData);

const updateData = Bacon.when([ selectData.toProperty({}), 
								newTitle.toProperty({}),
								newText.toProperty({}),
								editAction.toEventStream() ], toUpdateData);

selectValue.onValue(publish("ComponentTypeSelect"));
newTitle.onValue(publish("ComponentTitle"));
newText.onValue(publish("ComponentText"));

updateData.map(toCleanUpdate).onValue(publish("DynamicFormAdminSingleItemUpdateListener"));
