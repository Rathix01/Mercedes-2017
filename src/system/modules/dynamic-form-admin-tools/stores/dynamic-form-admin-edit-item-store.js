import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { BasicControls } from '../../dynamic-form-admin-controls';

const toFormListenerAction = (state) => state.component === "DynamicFormAdminActiveFormUpdateListener";
const toItemForAction = R.curry((action, item) => item.sectionId === action.stateKey); 
const toEditItem = (form, action) => R.filter(toItemForAction(action), form.items)

const activeForm = Actions.filter(toFormListenerAction);
const editAction = BasicControls.basicEdit.toEventStream();
const itemToEdit = Bacon.when([ activeForm.toProperty(), editAction ], toEditItem).map(R.head);

//activeForm.log('new form');
//itemToEdit.log('item to edit');

itemToEdit.onValue(publish("ItemToEdit"));
