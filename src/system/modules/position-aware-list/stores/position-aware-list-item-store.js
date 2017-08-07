import React from 'react'
import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { toTimeline } from '../../../stores/animation-store';
import { listUpdates } from './position-aware-list-store';
import { listenerUpdates } from './position-aware-list-updates-store';

const toPositionAwareListItem = (state) => state.component === "PositionAwareListItem";
const toItemMount = (state) => state.componentEvent === "component-mount";

const toPositions = (a, b) => {
	return b.index === "0" && a.next ? { prev: 0, next: b.event.clientHeight } : 
	 ({ prev: a.next || 0, 
		next: b.event ? ( b.event.clientHeight + ( a.next || 0 )) : 0, 
		key: b.id,
		uniqueId: b.uniqueId,
		index: parseInt(b.index), 
		target: b.target });
};

const toPositionUpdates = (prev, state) => {
	return R.merge(prev, { [state.key]: R.merge(state, 
		{ 
			isUpdate: prev[state.key] === undefined || (prev[state.key].next !== state.prev) || prev[state.key].uniqueId !== state.uniqueId, 
		 	prev: prev[state.key] === undefined ? state.prev : prev[state.key].next,
		 	next: state.prev
		}) 
	});
}

const toHasKey = (state) => state.key !== undefined;
const toInitialHide = (state) => publish(state.id + "Animation", { opacity: 0 });
const getOpacity = (state) => state.prev === 0 ? 0 : 1;

const toPositionTweens = (state) => {
	return ({
		tweenProps: [{
			time: 0.01,
			fn: "fromTo", 
			label: `DetailItemsPositionUpdateA${state.index}`, 
			target: `${ state.key }Animation`,
			from: { y: state.next, opacity: getOpacity(state), z: (100 - state.index) }, 
			to: { y: state.next, opacity: getOpacity(state) }
		}, {
			time: 0.4,
			fn: "fromTo", 
			label: `DetailItemsPositionUpdateB${state.index}`,
			target: `${ state.key }Animation`,
			from: { y: state.next, opacity: getOpacity(state)  }, 
			to: { y: state.next, opacity: 1 }
		}]
	})
};

//delay required here for a render so that event.clientHeight above can be measured;
const positionAwareAction = Actions.filter(toPositionAwareListItem);
const positionAwareListItemActions = positionAwareAction.delay(20);
const itemMount = positionAwareAction.filter(toItemMount);
itemMount.onValue(toInitialHide);

const resetPositions = positionAwareListItemActions.debounce(10).map({});
const positions = positionAwareListItemActions.toEventStream().merge(resetPositions.toEventStream()).scan({}, toPositions)
const positionUpdates = positions.filter(toHasKey).scan({}, toPositionUpdates);


positionUpdates.map(R.values)
			   .flatMap(Bacon.fromArray)
			   .filter(R.prop("isUpdate"))
			   .map(toPositionTweens)
			   .onValue(toTimeline);

module.exports = {
	positions, positionAwareListItemActions
}
