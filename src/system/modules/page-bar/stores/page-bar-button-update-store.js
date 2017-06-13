import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import AnimationStore from '../../../stores/animation-store';

const toBarButtonUpdates = (state) => state.component === "PageBarButton" && state.componentEvent === "component-update";
const pageChanges = Actions.filter(toBarButtonUpdates);

module.exports = {
	pageChanges
}
