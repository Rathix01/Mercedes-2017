import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Updates from './validation-message-store';
//import { Back } from 'gsap';

const validIs = R.curry((shouldBe, state) => state.valid === shouldBe);
const includeDisplay = (state) => R.merge(state, { display: (state.valid === false ? true : false) })
const publishVisibility = (state) => publish(state.id + "Visibility", state);
const toDisplayFalse = (state) => R.merge(state, { display: false, id: state.tweenProps[0].targetId })
const toUpdate = (update, trigger) => update;

const toDisplayTweens = (state) => ({
  tweenProps: [{
    time: 0.2,
    fn: 'fromTo',
    label: 'display',
    target: state.id + "Animation",
    from: { opacity: 0, scale: 0.98 },
    to: { opacity: 0, scale: 0, ease: Linear.easeNone },
    targetId: state.id, // not used in animation. Just passing ID back to stream.
  }, {
    time: 0.2,
    fn: 'fromTo',
    label: 'display',
    target: state.id + "Animation",
    from: { opacity: 0, scale: 0.98 },
    to: { opacity: 1, scale: 1, ease: Back.easeOut, delay: 0.2 },
    targetId: state.id, // not used in animation. Just passing ID back to stream.
  }]
});

const toHideTweens = (state) => ({
  tweenProps: [{
    time: 0.2,
    fn: 'fromTo',
    label: 'hide',
    target: state.id + "Animation",
    from: { opacity: 1, scale: 1 },
    to: { opacity: 0, scale: 0.98, ease: Back.easeIn },
    targetId: state.id, // not used in animation. Just passing ID back to stream.
  }]
});

// TODO - Fix "hide all errors" bug here.
const setUpHideErrorUpdates = (state) => {
  Updates.filter(validIs(true))
       .map(toHideTweens)
       .flatMap(toTimeline)
       .map(toDisplayFalse)
       .toEventStream()
       .delay(200)
       .onValue(publishVisibility)
}

const displayErrorUpdates = Updates.filter(validIs(false));
const displayAnimation = displayErrorUpdates.map(toDisplayTweens).flatMap(toTimeline);

displayErrorUpdates.map(includeDisplay).onValue(publishVisibility);

Bacon.when([ Updates.toProperty(), displayAnimation.toEventStream() ], toUpdate).onValue(setUpHideErrorUpdates);
