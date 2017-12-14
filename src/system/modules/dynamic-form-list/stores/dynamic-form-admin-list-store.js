import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toIsFormListAction = (state) => state.component === "DynamicFormListItemComponent";
const publishToList	= (state) => publish(`${state.id}List${state.index}`, {  items: state.itemState.items });

Actions.filter(toIsFormListAction).onValue(publishToList)