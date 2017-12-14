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

// TODO - remove this once validations become standard.
const toCleanItem = (state) => ({ ...state, validations: state.validations !== undefined ? state.validations : {} });
const toIndexAdjustment = R.curry((indexUpdate, state) => ({  ...state, nextUpdate: { idxUpdate: indexUpdate, targetID: state.uniqueId }}));

const activeForm = Actions.filter(toFormListenerAction);
const editAction = BasicControls.basicEdit.toEventStream();
const deleteAction = BasicControls.basicDelete.toEventStream();
const indexDownActions = BasicControls.indexDown.toEventStream();
const indexUpActions = BasicControls.indexUp.toEventStream();

const itemToEdit = Bacon.when([ activeForm.toProperty(), editAction ], toEditItem).map(R.head);
const itemToDelete = Bacon.when([ activeForm.toProperty(), deleteAction ], toEditItem).map(R.head);
const itemIndexDown = Bacon.when([ activeForm.toProperty(), indexDownActions ], toEditItem).map(R.head).map(toIndexAdjustment(1));
const itemIndexUp = Bacon.when([ activeForm.toProperty(), indexUpActions ], toEditItem).map(R.head).map(toIndexAdjustment(-1));

const editActions = itemToEdit.merge(itemIndexUp).merge(itemIndexDown);

editActions.map(toCleanItem).onValue(publish("ItemToEdit"));
itemToDelete.map(toDeleteItem).onValue(publish("DynamicFormAdminSingleItemUpdateListener"));
editActions.map(toNonDeleteItem).onValue(publish("DynamicFormAdminSingleItemUpdateListener"));
