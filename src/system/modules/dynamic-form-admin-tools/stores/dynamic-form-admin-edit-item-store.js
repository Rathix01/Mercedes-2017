import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { BasicControls } from '../../dynamic-form-admin-controls';

const toFormListenerAction = (state) => state.component === "DynamicFormAdminActiveFormUpdateListener";
const toItemForAction = R.curry((action, item) => item.uniqueId === action.stateKey); 
const toEditItem = (form, action) => R.filter(toItemForAction(action), form.items);
const toDeleteItem = (state) => ({ delete: true, ...state });
const toNonDeleteItem = (state) => ({ delete: false, ...state });

const activeForm = Actions.filter(toFormListenerAction);
const editAction = BasicControls.basicEdit.toEventStream();
const deleteAction = BasicControls.basicDelete.toEventStream();
const itemToEdit = Bacon.when([ activeForm.toProperty(), editAction ], toEditItem).map(R.head);
const itemToDelete = Bacon.when([ activeForm.toProperty(), deleteAction ], toEditItem).map(R.head);


itemToEdit.onValue(publish("ItemToEdit"));
itemToDelete.map(toDeleteItem).onValue(publish("DynamicFormAdminSingleItemUpdateListener"));
itemToEdit.map(toNonDeleteItem).onValue(publish("DynamicFormAdminSingleItemUpdateListener"));
