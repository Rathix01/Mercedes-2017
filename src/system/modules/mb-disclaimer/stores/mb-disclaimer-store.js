import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';


const toDisclaimerConfirmEvent = (state) => state.id === "DiclaimerConfirmButton";

const nextButtonEvent = Actions.filter(toDisclaimerConfirmEvent);


const toOpenDoneTweens = (state) => ({
  tweenProps: [
	  {
	    time: 0.3,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormPageDisclaimerAnimation",
	    from: { opacity:1, x:0 },
	    to: { opacity: 0, x:-400, ease: Power2.easeIn },
	  },
	  {
	    time: 0.3,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormPageNavigationAnimation",
	    from: { opacity:0, x:0 },
	    to: { opacity: 1, x:-1000, ease: Power2.easeIn },
	  },
	  {
	    time: 0.3,
	    fn: 'fromTo',
	    label: 'step-2',
	    target: "FormCarAnimation",
	    from: { scale: 0.5, y:-45 },
	    to: { scale: 1, y:0, ease: Power2.easeOut },
	  },
  ]
});


nextButtonEvent.map(toOpenDoneTweens)
		  .onValue(toTimeline);


nextButtonEvent.map({ display: false }).delay(1000).onValue(publish("FormPageDisclaimerVisibility"))
nextButtonEvent.map({ display: true }).delay(400).onValue(publish("FormCompleteVisibility"))
//nextButtonEvent.map({ display: true }).onValue(publish("FormPageAboutYouVisibility"))