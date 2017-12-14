import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';

const isCloseEvent = (state) => state.component === "MercedesBenzWebsiteFormPage";
const isCloseFormEvent = (state) => state.id === "CloseForm";

// animate
const toCloseTweens = (state) => ({
  tweenProps: [{
    time: 0.4,
    fn: 'staggerFromTo',
    label: 'load-form-page',
    target: "FormPageAnimation FinanceFormAnimation",
    from: { opacity: 1, y: 0 },
    to: { opacity: 0, y: 0, ease: Power1.easeInOut },
    stagger: 0.1,
  }]
});

//handle close event.
Actions.filter(isCloseEvent)
	   .map(toCloseTweens)
	   .flatMap(toTimeline)
	   .map({ display: false })
	   .delay(50)
	   .onValue(publish("FormPageVisibility"));

Actions.filter(isCloseFormEvent).log('close event')
     .map(toCloseTweens)
     .flatMap(toTimeline)
     .map({ display: false })
     .delay(50)
     .onValue(publish("FormPageVisibility"));