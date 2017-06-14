import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toPlusMinusToggleAction = (state) =>  state.component === "PlusMinusToggleButton";
const toPlusMinusUpdate = (state) => state.component === "PlusMinusToggle" && state.componentEvent === "component-update";
const preventBubbling = (state) => state.event.stopPropagation();
const publishToTarget = (state) => publish(state.target, { id: state.target });

const plusMinusUpdate = Actions.filter(toPlusMinusUpdate);
const plusMinusClick = Actions.filter(toPlusMinusToggleAction);

plusMinusClick.onValue(preventBubbling);
plusMinusClick.onValue(publishToTarget);

module.exports = {
	plusMinusClick, plusMinusUpdate
}
