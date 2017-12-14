import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toBasicAction = (state) => state.component === "DynamicFormAdminBasicControls";
const toEditAction = (state) => state.event.target.id === "basic-edit";
const toDeleteAction = (state) => state.event.target.id === "basic-delete";
const toIndexUpAction = (state) => state.event.target.id === "basic-edit-index-up";
const toIndexDownAction = (state) => state.event.target.id === "basic-edit-index-down";

const basicAction =  Actions.filter(toBasicAction);

const basicEdit = basicAction.filter(toEditAction);
const basicDelete = basicAction.filter(toDeleteAction);
const indexUp = basicAction.filter(toIndexUpAction);
const indexDown = basicAction.filter(toIndexDownAction);

module.exports = {
	basicEdit, basicDelete, indexUp, indexDown
};