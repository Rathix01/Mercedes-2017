import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import { open, close, closeAll } from './detail-toggle-store';
import publish from '../../../stores/state-store';

const toOpenTweens = R.curry((isList, state) => ({
	tweenProps: [{ 
			time: 0.01,
			fn: "fromTo", 
			label: "detailOpen", 
			target: state.id + "DetailAreaAnimation", 
			from: { opacity: 0 }, 
			to: { opacity: 0 }
		},{ 
			time: 0.3,
			fn: "fromTo", 
			label: "detailOpen", 
			target: `${ state.id }DetailAreaAnimation`, 
			from: { scale: 0.98, opacity: 0 }, 
			to: { scale: 1, opacity: 1, ease: Power2.easeInOut, delay: isList ? 0.5 : 0.1 }
		}
	]
}));

const toCloseTweens = (state) => ({
	tweenProps: [{
			time: 0.3,
			fn: "fromTo", 
			label: "detailOpen", 
			target: `${ state.id }DetailAreaAnimation`, 
			from: { scale: 1,opacity: 1 }, 
			to: { scale: 0.98,opacity: 0, ease: Power2.easeInOut }
		}
	]
});

const isClosed = (state) => state.isOpen !== true;
const publishVisibility = (state) => publish( `${ state.id }DetailAreaVisibility`, { display: state.isOpen });
const isListMember = R.curry((shouldBe, state) => state.isListMember === shouldBe);

const listOpen = open.filter(isListMember(true));
const singleOpen = open.filter(isListMember(false));

singleOpen.merge(closeAll.filter(R.prop("isOpen"))).map(toOpenTweens(false)).onValue(toTimeline);
listOpen.map(toOpenTweens(true)).onValue(toTimeline)
open.onValue(publishVisibility);

const closeTweens = close.merge(closeAll.filter(isClosed)).map(toCloseTweens).flatMap(toTimeline);
Bacon.when([ close.toProperty(), closeTweens.toEventStream() ], (c) => c).delay(100).onValue(publishVisibility);

closeAll.onValue(publishVisibility)

module.exports = {
	closeTweens
}