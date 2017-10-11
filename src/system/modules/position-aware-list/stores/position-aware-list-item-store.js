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
	return R.merge(prev, { [state.uniqueId]: R.merge(state, 
		{ 
			isUpdate: prev[state.uniqueId] === undefined 
				|| (prev[state.uniqueId].next !== state.prev && state.prev !== state.next) 
				|| prev[state.uniqueId].uniqueId !== state.uniqueId, 
		 	prev: prev[state.uniqueId] === undefined ? state.prev : prev[state.uniqueId].next,
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
			from: { y: state.prev, opacity: getOpacity(state), z: (100 - state.index) }, 
			to: { y: state.prev, opacity: getOpacity(state) }
		}, {
			time: 0.4,
			fn: "fromTo", 
			label: `DetailItemsPositionUpdateB${state.index}`,
			target: `${ state.key }Animation`,
			from: { y: state.prev, opacity: getOpacity(state)  }, 
			to: { y: state.position, opacity: 1 }
		}]
	})
};


const getClientTopPosition = (state) => state.event === undefined ? 0 : Math.round(state.event.getBoundingClientRect().top);
const getClientHeight = (state) => state.event === undefined ? 0 : Math.round(state.event.getBoundingClientRect().height);

const toHeights = (prev, next) => R.merge(prev, { [next.id]: { uniqueId: next.uniqueId,
															   key: next.id, 
															   position: getClientTopPosition(next),
															   height: getClientHeight(next),
															   index: parseInt(next.index) } })

const toValidHeights = (prev, next) => R.filter((i) => i.uniqueId !== undefined, toHeights(prev, next));
	

const filterToChanges = (state) => R.filter((i) => i.prev !== i.position, state)
const filterByIndex = (prev, next) => {
	return R.filter((p) => { return p.index === next.index }, prev);
}
const filterByUniqueId = (ids, next) => {
	return R.filter((i) => { return i === next.uniqueId }, ids);
}
const filterEmpty = (state) => state.length !== 0;
const filterToPrev = (prev, next) => {
	return (filterByIndex(prev.updates, next).length >= 1 )
									? ( filterByUniqueId(prev.ids, next).length !== 0 )
									   ? R.head(filterByIndex(prev.updates, next)).position
									   : -1
									: -1;
};

const getPosition = (prev, next, item) => {
	var x = R.reduce(( sum, item ) => { return item.height + sum }, 0, R.filter((i) => i.index < item.index, R.values(next)));
	return prev[next.index] === undefined ? x : next.position;
};

const toNext = (prev, next) => {
	return R.map((i) => {
		return R.merge(i, { prev: filterToPrev(prev, i), position: getPosition(prev, next, i) })
	}, R.values(next));
}

const toAllIds = (prev, next) => R.uniq(R.concat(prev.ids, R.map(R.prop("uniqueId"), R.values(next))));
const toPrevAndNext = (prev, next) => ({ ids: toAllIds(prev, next), updates: toNext(prev, next) })

const positionAwareAction = Actions.filter(toPositionAwareListItem).log('?');
const positionAwareListItemActions = positionAwareAction;
const itemMount = positionAwareAction.filter(toItemMount);
itemMount.onValue(toInitialHide);

const resetPositions = positionAwareListItemActions.map({});
const positions = positionAwareListItemActions.toEventStream().merge(resetPositions.toEventStream()).scan({}, toPositions)
const positionUpdates = positions.filter(toHasKey).scan({}, toPositionUpdates);

const dimensions = positionAwareListItemActions.toEventStream().merge(resetPositions.debounce(5).toEventStream()).scan({}, toValidHeights)

dimensions
	   .scan({ ids: [], updates:[] }, toPrevAndNext)
	   .map(R.prop("updates"))
 	   .map(filterToChanges)
 	   .filter(filterEmpty)
 	   .flatMap(Bacon.fromArray)
 	   .map(toPositionTweens)
 	   .onValue(toTimeline);

module.exports = {
	positions, 
	positionAwareListItemActions
}
