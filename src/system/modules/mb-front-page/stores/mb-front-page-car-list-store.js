import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';

// populate car items from Services.
const toCarItems = (state) => ({ items: state });
const cars = Services.cars.map(toCarItems);

// publish to list
cars.onValue(publish("CarList"));

// publish to slider
cars.onValue(publish("CarListSlider"));

// detect click on apply now button
const isCarItemApplyNowEvent = (state) => state.component === "MercedesBenzWebsiteFrontPageCarListItem";
const toSelectedCar = (state) => ({ uniqueId: state.uniqueId, name: state.name, rrp: state.rrp, from: state.from });
const toTweensForPageSize = (state) => window.document.body.clientWidth >= 600 ? toOpenTweens(state) : toOpenMobileTweens(state); 

// animation object.
const toOpenTweens = (state) => ({
  tweenProps: [{
    time: 0.4,
    fn: 'staggerFromTo',
    label: 'load-form-page',
    target: "FormPageAnimation FinanceFormAnimation",
    from: { opacity: 0 },
    to: { opacity: 1, ease: Power1.easeInOut },
  }]
});

// mobile screens animation object
const toOpenMobileTweens = (state) => ({
  tweenProps: [{
    time: 0.4,
    fn: 'fromTo',
    label: 'load-form-page',
    target: "FrontPageAnimation",
    from: { y: 0 },
    to: { y: -1000, ease: Power1.easeInOut },
  },{
    time: 0.01,
    fn: 'fromTo',
    label: 'load-form-page',
    target: "FormPageAnimation",
    from: { opacity: 1 },
    to: { opacity: 1, ease: Power1.easeInOut },
  },
  {
    time: 0.4,
    fn: 'fromTo',
    label: 'load-form-page',
    target: "FormPageAnimation",
    from: { y: 1000 },
    to: { y: 0, ease: Power1.easeInOut },
  },{
    time: 0.01,
    fn: 'fromTo',
    label: 'load-form-page',
    target: "FinanceFormAnimation",
    from: { opacity: 0 },
    to: { opacity: 0, ease: Power1.easeInOut },
  },
  {
    time: 0.01,
    fn: 'fromTo',
    label: 'load-form-page-2',
    target: "FrontPageAnimation",
    from: { y: 0 },
    to: { y: 0, ease: Power1.easeInOut },
  }]
});

// detect click of apply now buttons. selected option state is attached.
const applyNowEvent = Actions.filter(isCarItemApplyNowEvent);

// on apply now show the form page. slight delay helps to make animation work better.
applyNowEvent.map({ display: true }).delay(50).onValue(publish("FormPageVisibility"));

// animate opacity for a fade in.
applyNowEvent.map(toTweensForPageSize).onValue(toTimeline);

// publish active car item.
applyNowEvent.map(toSelectedCar).onValue(publish("SelectedCar"));
