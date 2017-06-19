import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { update, page, formPage } from './dynamic-form-store';

const mapIndexed = R.addIndex(R.map);
const toNextPage = (formPage, page) => ({ items: formPage.items, page: page.value });
const toFirstPage = (formPage, page) => ({ items: formPage.items, page: 1 });
const combineNextAndPrev = (prev, next) => R.merge(next, { prev: prev });
const getAnimationTargets = (state) => mapIndexed((item, idx) => `DynamicFormSectionsListItem${ idx }Animation`, state.items).join(" ");

const nextFormPage = formPage.toProperty();

const toHideTweens = (state) => ({
	tweenProps: [{ 
			time: 0.4,
			fn: "staggerFromTo", 
			label: "detailOpen", 
			target: getAnimationTargets(state.prev), 
			from: { opacity: 1, y:0 }, 
			to: { opacity: 0, y:-10, ease: Power1.easeOut },
			stagger: 0.01,
		}
	]
});

const toShowTweens = (state) => ({
	tweenProps: [{ 
			time: 0.4,
			fn: "staggerFromTo", 
			label: "detailOpen", 
			target: getAnimationTargets(state), 
			from: { opacity: 0, y:10 }, 
			to: { opacity: 1, y:0, ease: Power1.easeOut },
			stagger: 0.01,
		}
	]
});

const nextPage = Bacon.when([ nextFormPage, page.toEventStream() ], toNextPage);
const newFormPage = Bacon.when([nextFormPage.toProperty(), update.toEventStream() ], toFirstPage)
const nextAndPrev = nextPage.merge(newFormPage).debounce(10).scan({ page: 1, items: [] }, combineNextAndPrev).toEventStream();
// no-op, ensures first render.
nextAndPrev.onValue(()=> {});

const animFinished = nextAndPrev.map( toHideTweens ).flatMap(toTimeline);
const newPage = Bacon.when([ nextFormPage, animFinished.toEventStream() ], (page) => page)

newPage.onValue(publish("DynamicFormSections"));
newPage.map(toShowTweens).onValue(toTimeline);

