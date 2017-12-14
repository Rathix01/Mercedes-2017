import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import { inputActions, itemSelected } from './input-autocomplete-store';

const toOpenTweens = (state) => ({
	tweenProps: [{ 
			time: 0.01,
			fn: "fromTo", 
			label: "detailOpen", 
			target: state.rootId + "ListAnimation", 
			from: { opacity: 0, scale: 0.98, }, 
			to: { opacity: 0, scale: 0.98, }
		},{ 
			time: 0.3,
			fn: "fromTo", 
			label: "detailOpen", 
			target: `${ state.rootId }ListAnimation`, 
			from: { scale: 0.98, opacity: 0 }, 
			to: { scale: 1, opacity: 1, ease: Power2.easeInOut, delay: 0.2 }
		}
	]
});

const toOpenState = R.curry((shouldBe, prev, next) => ({ ...prev, [next.rootId]: { animate: prev[next.rootId] === undefined 
																 || prev[next.rootId].open !== true,
															 open: shouldBe && next.event.targetValue.length > 2 }}));

const publishVisible = R.curry((shouldBe, state) => {
	publish(`${state.rootId}ListVisibility`, {display: shouldBe});
});

const toNextState = (openStates, input) => {
	return ({ ...input, isOpen: openStates[input.rootId] });
}

const needsAnimation = (state) => state.isOpen.animate === true;

inputActions.onValue(publishVisible(true))
const openStates = Bacon.update({}, [ inputActions ], toOpenState(true), [ itemSelected ], toOpenState(false));
const nextOpenState = Bacon.when([ openStates.toProperty(), inputActions ], toNextState);
nextOpenState.filter(needsAnimation).map(toOpenTweens).onValue(toTimeline);

itemSelected.map(R.prop("input")).debounce(100);
itemSelected.onValue(publishVisible(false));

