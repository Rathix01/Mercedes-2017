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
		   	  next: b.event ? ( b.event.clientHeight + ( a.next || 0 )) : 0, key: b.id, index: parseInt(b.index), target: b.target });
};

const toPositionUpdates = (prev, state) => R.merge(prev, { [state.key]: R.merge(state, { isUpdate: prev[state.key] === undefined || 
														 (prev[state.key].prev !== state.prev || prev[state.key].next !== state.next) }) });

const toHasKey = (state) => state.key !== undefined;
const toInitialHide = (state) => publish(state.id + "Animation", { opacity: 0 });

const toPositionTweens = (state) => ({
	tweenProps: [{
		time: 0.01,
		fn: "fromTo", 
		label: `detailItemsPositionUpdateA${state.index}`, 
		target: `${ state.key }Animation`,
		from: { y: state.prev + 100, opacity: 0, z: (100 - state.index) }, 
		to: { y: state.prev + 100, opacity: 0 }
	}, {
		time: 0.4,
		fn: "fromTo", 
		label: `detailItemsPositionUpdateB${state.index}`,
		target: `${ state.key }Animation`,
		from: { y: state.prev + 100, opacity: 0 }, 
		to: { y: state.prev, delay: state.index * 0.01, opacity: 1 }
	}]
});

//delay required here for a render so that event.clientHeight above can be measured;
const positionAwareAction = Actions.filter(toPositionAwareListItem);
const positionAwareListItemActions = positionAwareAction.delay(10);
const itemMount = positionAwareAction.filter(toItemMount);
itemMount.onValue(toInitialHide);


const resetPositions = positionAwareListItemActions.debounce(10).map({});
const positions = positionAwareListItemActions.toEventStream().merge(resetPositions.toEventStream()).scan({}, toPositions)
const positionUpdates = positions.filter(toHasKey).scan({}, toPositionUpdates);

//TODO - process each tween set as a group (remove Bacon.fromArray);
positionUpdates.map(R.values)
			   .flatMap(Bacon.fromArray)
			   .filter(R.prop("isUpdate"))
			   .map(toPositionTweens)
			   .onValue(toTimeline);

module.exports = {
	positions, positionAwareListItemActions
}
