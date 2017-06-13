import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { pagesAndChange, nextPage } from '../../page-bar';
import { listUpdates } from './detail-toggle-list-store';
import { toTimeline } from '../../../stores/animation-store';

const reduceWithIndex = R.addIndex(R.reduce);
const toPageUpdate = (list, update) => ({ list, update });
const toKeyAndFalse = R.curry((key, i) => ({ id: `${key}ListListItem${i}`, isOpen: false, forceState: true }));
const toOpenStateFalseUpdates = (state) => R.map(toKeyAndFalse(state.update.pages.pageFor), R.range(0, state.update.pages.pageSize))
const publishForceClose = (state) => publish(state.id, state);
const getListItems = (id, items) => reduceWithIndex((existing, item, idx) => existing.concat(`${id}ListListItem${idx}Animation `),  "", items);

const toFadeInOutTweens = (state) => ({
	tweenProps: [{ 
			time: 0.2,
			fn: "fromTo", 
			label: "detailOpen1", 
			target: state.update.pages.pageFor + "ListAnimation", 
			from: { opacity: 1, y:0 }, 
			to: { opacity: 0, y: -40 }
		},{ 
			time: 0.3,
			fn: "fromTo", 
			label: "detailOpen2", 
			target: state.update.pages.pageFor + "ListAnimation",
			from: { opacity: 0, y: 40 }, 
			to: { opacity: 1, y: 0, delay: 0.4 }
		}
	]
});

const toHideTweens = (state) => ({
	tweenProps: [{ 
			time: 0.001,
			fn: "fromTo", 
			label: "listHide", 
			target: state.id + "ListAnimation", 
			from: { opacity: 0 }, 
			to: { opacity: 0 }
		},{ 
			time: 0.2,
			fn: "staggerFromTo", 
			label: "listHide", 
			target: getListItems(state.id, state.items),
			from: { opacity: 0 }, 
			to: { opacity: 0 },
			stagger: 0.01,
		},{ 
			time: 0.2,
			fn: "fromTo", 
			label: "listShow", 
			target: state.id + "ListAnimation", 
			from: { opacity: 0 }, 
			to: { opacity: 1, delay: 0.5 }
		},{ 
			time: 0.3,
			fn: "staggerFromTo", 
			label: "listShow2", 
			target:  `${ state.id }ListListItem5Animation ${ state.id }ListListItem4Animation ${ state.id }ListListItem3Animation ${ state.id }ListListItem2Animation ${ state.id }ListListItem1Animation ${ state.id }ListListItem0Animation`, //getListItems(state.id, R.reverse(state.items)),
			from: { opacity: 0, scale: 0.95 }, 
			to: { opacity: 1, scale: 1 },
			stagger: 0.06
		}
	]
});

const pageUpdate = Bacon.when([ listUpdates.toProperty(), pagesAndChange.toEventStream() ], toPageUpdate)

pageUpdate.map(toOpenStateFalseUpdates).flatMap(Bacon.fromArray).onValue(publishForceClose);
pageUpdate.map(toFadeInOutTweens).onValue(toTimeline);

listUpdates.map(toHideTweens).flatMap(toTimeline).onValue(() => Bacon.noMore);

module.exports = {
	pageUpdate
}