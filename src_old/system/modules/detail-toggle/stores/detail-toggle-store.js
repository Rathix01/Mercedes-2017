import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toDetailToggleInitEvent = (state) => R.equals(R.prop("component", state), "DetailToggleContainer");
const toDetailToggleUpdateEvent = (state) => R.equals(R.prop("component", state), "DetailToggleContainer") && R.equals(R.prop("componentEvent", state), "component-update");
const toDetailToggleEvent = (state) => R.equals(R.prop("component", state), "DetailToggle");
const toToggleStates = (prev, next) => R.merge(prev, { [next.id]: toNextToggleState(prev, next) });
const getNextState = (prev, next) => next.forceState === true ? next.isOpen : !prev[next.id]; 
const toNextToggleState = (prev, next) => prev[next.id] === undefined ? !next.forceState : ( next.forceState === true ? false : !prev[next.id] );
const toItemWithNextToggleState = (toggleEvent, toggleStates) => R.merge(toggleEvent, { isOpen: toggleStates[toggleEvent.id] });
const isOpen = R.curry((shouldBe, state) => R.equals(R.prop("isOpen", state), shouldBe));
const toForceStateFalse = (state) => R.merge(state, { forceState: false });
const toToggleUpdates = (prev, next) => { prev: prev.next, next };
const publishToggleToButton = (state) => publish(`${state.id}PlusMinusToggle`, { id: `${state.id}PlusMinusToggle`, stamp: new Date().getTime() })

const init = Actions.filter(toDetailToggleInitEvent);
const detailToggleEvent = Actions.filter(toDetailToggleEvent).map(toForceStateFalse);
const forceToggleUpdateEvent = Actions.filter(toDetailToggleUpdateEvent);
const detailToggleItemStates = detailToggleEvent.merge(forceToggleUpdateEvent).scan({}, toToggleStates);
const detailToggleUpdates = detailToggleItemStates.scan({}, toToggleUpdates);

const toggleUpdate = Bacon.when([detailToggleEvent, detailToggleItemStates], toItemWithNextToggleState);
const closeAll = Bacon.when([forceToggleUpdateEvent, detailToggleItemStates], toItemWithNextToggleState);

const open = toggleUpdate.filter(isOpen(true));
const close = toggleUpdate.filter(isOpen(false));

detailToggleEvent.onValue(publishToggleToButton);

module.exports = {
	toggleUpdate, closeAll, open, close, init
}