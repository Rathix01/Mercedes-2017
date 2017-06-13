import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Updates from './validation-message-store';
import { Back } from 'gsap';

const validIs = R.curry((shouldBe, state) => state.valid === shouldBe);
const includeDisplay = (state) => R.merge(state, { display: (state.valid === false ? true : false) })
const publishVisibility = (state) => publish(state.id + "Visibility", state);
const toDisplayFalse = R.curry((state, trigger) => R.merge(state, { display: false }));
const toUpdate = (update, trigger) => update;

const toDisplayTweens = (state) => ({
  tweenProps: [{
    time: 0.2,
    fn: 'fromTo',
    label: 'display',
    target: state.id + "Animation",
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, ease: Back.easeOut }
  }]
});

const toHideTweens = (state) => ({
  tweenProps: [{
    time: 0.2,
    fn: 'fromTo',
    label: 'hide',
    target: state.id + "Animation",
    from: { opacity: 1, y: 0 },
    to: { opacity: 0, y: -50, ease: Back.easeIn }
  }]
});

const setUpHideErrorUpdates	= (state) => {
	Updates.filter(validIs(true))
		   .map(toHideTweens)
		   .flatMap(toTimeline)
		   .map(toDisplayFalse(state))
		   .delay(200)
		   .map(publishVisibility)
		   .onValue(() => Bacon.noMore);
}

const displayErrorUpdates = Updates.filter(validIs(false));
const displayAnimation = displayErrorUpdates.map(toDisplayTweens).flatMap(toTimeline);

displayErrorUpdates.map(includeDisplay).onValue(publishVisibility);

Bacon.when([ Updates.toProperty(), 
			 displayAnimation.toEventStream() ], toUpdate).onValue(setUpHideErrorUpdates);
