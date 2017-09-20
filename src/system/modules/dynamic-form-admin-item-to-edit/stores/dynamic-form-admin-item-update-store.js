import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { itemToEdit } from './dynamic-form-admin-item-to-edit-store'; 

const toItemEdit = (state) => state.component === "DynamicFormAdminEditForm"
const toItemByID = R.curry((id, state) => state.id === id);
const toInputOptions = (state) => state.value ? R.map((i) => ({ text: i, value: i }), state.value.split(",")) : [];
const toTypeSelectData = (state) => ({ type: state.event.target.value, targetID: state.targetID });
const toUpdateData = (type, title, text, inputType, inputOptions, page, item, edit) => ({ nextUpdate: { type:type.type, 
																   componentType: type.type,
																   title:title.value, 
																   text: text.value,
																   page: parseInt(page.value) || 1,
																   inputType: inputType.value,
																   itemState: { items: toInputOptions(inputOptions) },
																   targetID: item.uniqueId }});

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
const pageNumber = Actions.filter(toItemByID("ComponentPage")).map(toTextValue).toProperty({});
const inputType = Actions.filter(toItemByID("ComponentInputType")).map(toTextValue);
const inputOptions = Actions.filter(toItemByID("ComponentOptions")).map(toTextValue);

const selectValue = itemTypeSelectAction.map(toValue);
const selectData = itemTypeSelectAction.map(toTypeSelectData);

itemToEdit.onValue((item) => {
	const updateData = Bacon.when([ selectData.toProperty({}), 
								newTitle.toProperty({}),
								newText.toProperty({}),
								inputType.toProperty({}),
								inputOptions.toProperty({}),
								pageNumber,
								Bacon.once(item).toProperty(),
								editAction.toEventStream() ], toUpdateData);

	updateData.map(toCleanUpdate).onValue(publish("DynamicFormAdminSingleItemUpdateListener"));
});



selectValue.onValue(publish("ComponentTypeSelect"));
newTitle.onValue(publish("ComponentTitle"));
newText.onValue(publish("ComponentText"));
pageNumber.onValue(publish("ComponentPage"));
inputType.onValue(publish("ComponentInputType"));
inputOptions.onValue(publish("ComponentOptions"));
