import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import { calendarClicks } from './input-date-picker-store'
import { Back } from 'gsap';

const toggleOpenState = (prev, next) => R.merge(next, { open: !prev.open });
const calendarIsOpen = R.curry((shouldBe, state) => state.open === shouldBe);
const publishVisibleTo = R.curry((shouldBe, state) => publish(state.id + "ContainerVisibility", { display: shouldBe }))
const toEvent = (event, trigger) => event;

const toDisplayTweens = (state) => ({
  tweenProps: [{
    time: 0.2,
    fn: 'fromTo',
    label: 'display',
    target: state.id + "ContainerAnimation",
    from: { opacity: 0, y: 50 },
    to: { opacity: 1, y: 0, ease: Back.easeOut }
  }]
});

const toHideTweens = (state) => ({
  tweenProps: [{
    time: 0.2,
    fn: 'fromTo',
    label: 'hide',
    target: state.id + "ContainerAnimation",
    from: { opacity: 1, y: 0 },
    to: { opacity: 0, y: -50, ease: Back.easeIn }
  }]
});

const calendarOpenState = calendarClicks.scan( { open: false }, toggleOpenState );

const calendarWillOpen = calendarOpenState.filter(calendarIsOpen(true))
const calendarWillClose = calendarOpenState.filter(calendarIsOpen(false))//.map(toHideTweens)

calendarWillOpen.onValue(publishVisibleTo(true));
const calendarOpen = calendarWillOpen.map(toDisplayTweens).flatMap(toTimeline);

const calendarClosed = calendarWillClose.map(toHideTweens).flatMap(toTimeline);
const closedEvent = Bacon.when([ calendarWillClose.toProperty(), calendarClosed.toEventStream() ], toEvent);
closedEvent.onValue(publishVisibleTo(false));

// no ops here allow for use of flatMap
// on the animations which enables the ability
// to pass out the animation finished events.
calendarOpen.onValue(() => {});
calendarClosed.onValue(() => {});

module.exports = {
	calendarOpen, calendarClosed
};
