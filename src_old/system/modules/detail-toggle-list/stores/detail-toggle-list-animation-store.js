import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { listUpdates } from './detail-toggle-list-store';
import { open, close, init, closeTweens } from '../../detail-toggle';
import { toTimeline } from '../../../stores/animation-store';

const mapPositions = R.curry((openOrClose, state, item) => ({
			time: 0.4,
			fn: "fromTo", 
			label: `detailItemsPositionUpdate`, 
			target: `${ item.key }Animation`, 
			from: { y: item.index !== "0" && item.prevPosition === 0 ? item.position :  item.prevPosition }, 
			to: { y: item.position, delay: openOrClose === "open" ? ((state.length - item.index) * 0.02) : item.index * 0.05 }
}));
	
const toPositionTweens = (openOrClose, state) => { 
	return { tweenProps: R.map(mapPositions(openOrClose, state), state) }
};
const toNextTweens = (state) => state;

const toStateWithDimensions = (state) => {
	return R.merge(state, ({ height: state.event.offsetHeight || state.event.componentNode && state.event.componentNode.offsetHeight || 0 }));
}
const toListItem = (state) => toStateWithDimensions(state);
const toListItems = (existing, state) => R.merge(existing, { [state.id]: toListItem(state) });

const getPosition = R.curry((key, state, instanceKey, num) => {
	return state[key].index > state[instanceKey].index ? num + state[instanceKey].height : num
});

const toPositions = (state) => {
	const mapKeys = (key) => ({ key, position: R.reduce((k, num) => getPosition(key, state, num, k), 0, R.keys(state)), index: state[key].index });
	return R.map(mapKeys, R.keys(state))
}

const getPrev = (prev, next) => {
	const prevPos = R.filter((p) => p.key === next.key, prev)[0];
	return prevPos ? prevPos.position : 0;
}
const includePrev = R.curry((prev, next) => R.merge(next, { prevPosition: getPrev(prev, next) }));
const includePrevPositions = (existing, next) => R.map(includePrev(existing), next);



const initItem = init.delay(50).map(toListItem);
const openOrClose = open.map("open").merge(close.map("close"));
const closeItem = Bacon.when([close.toProperty(), closeTweens], (c) => c).debounce(100)
const listItems = initItem.merge(open.delay(100)).merge(closeItem).scan({}, toListItems).toEventStream();

const positions = listItems.map(toPositions).debounce(10);
const tweenPositions = positions.scan([], includePrevPositions);

Bacon.when([openOrClose.toProperty("open"), tweenPositions.toEventStream()], toPositionTweens).onValue(toTimeline);
