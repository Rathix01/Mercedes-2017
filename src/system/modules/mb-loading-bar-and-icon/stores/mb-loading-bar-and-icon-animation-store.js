import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';

// Nudge the loading bar to 10% to represent requests being sent.
const toInitLoadTweens = (state) => ({
  tweenProps: [{
    time: 1,
    fn: 'fromTo',
    label: 'load-1',
    target: "LoadingBarAnimation",
    from: { opacity: 1, scale: 0 },
    to: { opacity: 1, scale: 0.1, ease: Linear.easeNone },
  }]
});

// update the position of the loading bar according to the state object.
const toDataReadyTweens = (state) => ({
  tweenProps: [{
    time: 0.6,
    fn: 'fromTo',
    label: 'load-2',
    target: "LoadingBarAnimation",
    from: { opacity: 1, scale: state.prev  },
    to: { opacity: 1, scale: state.next, ease: Linear.easeNone },
  }]
});

const toNextPosition = (a, b) => ({ prev: a.next || 0.1, next: (a.next + 0.3) });

// tweens for fading the loading bar out
const toHideLoadingBarTweens = (state) => ({
  tweenProps: [{
    time: 0.6,
    fn: 'fromTo',
    label: 'load-4',
    target: "LoadingBarAndIconAnimation",
    from: { opacity: 1 },
    to: { opacity: 0, ease: Linear.easeNone },
  }]
});

// an inital animation to make the bar nudge forward instantly (for good feels).
const initAnimation = Bacon.once({}).map(toInitLoadTweens).flatMap(toTimeline).toProperty();

// events (currently falsely debounced) that represent data sets that have loaded.
const carsLoaded = Bacon.combineTemplate({i: initAnimation, data: Services.cars}).debounce(200).toEventStream();
const modelTypesLoaded = Bacon.combineTemplate({i: initAnimation, data: Services.modelTypes}).debounce(500).toEventStream();
const dealersLoaded = Bacon.combineTemplate({i: initAnimation, data: Services.dealers}).debounce(1600).toEventStream();

// a merged event for any data loading event
const dataLoading = carsLoaded.merge(modelTypesLoaded).merge(dealersLoaded);

// an event that represents the ending of the movement when the loading bar is updated.
const animationComplete = dataLoading.scan({ next:0.1 }, toNextPosition).map(toDataReadyTweens).flatMap(toTimeline);

// when all data and the final animationComplete is done, run the hide loading bar animation.
const allAnimationComplete = Bacon.when([ carsLoaded.toProperty(), 
                                          modelTypesLoaded.toProperty(), 
                                          dealersLoaded.toProperty(), 
                                          animationComplete.toEventStream() ], toHideLoadingBarTweens).flatMap(toTimeline);

// hide the loading screen when load is complete.
allAnimationComplete.map({ display: false }).onValue(publish("LoadingBarAndIconVisibility"));
