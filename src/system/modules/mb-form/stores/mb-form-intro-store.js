import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';

const isIntroButton = (state) => state.component === "MercedesBenzWebsiteFormIntro" && 
								 state.componentEvent === "component-update";

const isApplyButton = (state) => state.event.target.id === "apply"
const isStartButton = (state) => state.event.target.id === "start";
const isCloseIntroButton = (state) => state.id === "FormIntro";
const isMobileApplyButton = (state) => state.id === "MobileApply";

const toOpenIntroTweens = (state) => ({
  tweenProps: [
	  {
	    time: 0.3,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormIntro1Animation",
	    from: { opacity: 1 },
	    to: { opacity: 0, ease: Power2.easeOut },
	  },
	  {
	    time: 0.3,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormCarAnimation",
	    from: { scale: 1, y:0 },
	    to: { scale: 0.5, y:-45, ease: Power2.easeOut },
	  },
  ]
});

const toCloseIntroTweens = (state) => ({
  tweenProps: [
	  {
	    time: 0.01,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormPageNavigationAnimation",
	    from: { x: -300 },
	    to: { x: -300, ease: Linear.easeNone },
	  },
	  {
	    time: 0.01,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormIntro2Animation",
	    from: { x: -300 },
	    to: { x: -300, ease: Linear.easeNone },
	  },
	  {
	    time: 0.3,
	    fn: 'fromTo',
	    label: 'step-2',
	    target: "FormPageNavigationAnimation",
	    from: { x:-300 },
	    to: { x:-10, ease: Power2.easeOut, delay: 0.3 },
	  },
	  {
	    time: 0.3,
	    fn: 'fromTo',
	    label: 'step-2',
	    target: "FormIntro2Animation",
	    from: { x:-300 },
	    to: { x:0, ease: Power2.easeOut, delay: 0.3 },
	  },
  ]
});

const toNextPageTweens = (state) => ({
  tweenProps: [
	  {
	    time: 0.2,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormIntro1Animation",
	    from: { opacity: 1 },
	    to: { opacity: 0, ease: Power2.easeIn },
	  },
	  {
	    time: 0.2,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormIntro2Animation",
	    from: { opacity: 1 },
	    to: { opacity: 0, ease: Power2.easeIn },
	  },
	  {
	    time: 0.01,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormIntro1Animation",
	    from: { x: -1000 },
	    to: { x: -1000, ease: Power2.easeIn },
	  },
	  {
	    time: 0.01,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormIntro2Animation",
	    from: { x: -1000 },
	    to: { x: -1000, ease: Power2.easeIn },
	  },
  ]
});

const toMobileApplyTweens = (state) => ({
  tweenProps: [
	  {
	    time: 0.4,
	    fn: 'fromTo',
	    label: 'show-form',
	    target: "FinanceFormAnimation",
	    from: { opacity: 0, y: 1000 },
	    to: { opacity: 1, y: 700, ease: Power1.easeInOut },
	  }
  ]
});

const toShowFormTweens = (state) => ({
  tweenProps: [
	  {
	    time: 0.01,
	    fn: 'fromTo',
	    label: 'step-1',
	    target: "FormIntro1Animation",
	    from: { x: -1000, opacity: 0 },
	    to: { x: -1000, opacity: 0, ease: Power2.easeIn },
	  },
	  {
	    time: 0.4,
	    fn: 'fromTo',
	    label: 'step-2',
	    target: "FormIntro2Animation",
	    from: { opacity:0, y:180 },
	    to: { opacity: 1, y: 180, ease: Linear.easeOut },
	  },
	  {
	    time: 0.4,
	    fn: 'fromTo',
	    label: 'step-2',
	    target: "FormPageNavigationAnimation",
	    from: { opacity:0, x:-10 },
	    to: { opacity: 1, x:-10, ease: Power1.easeOut  },
	  },
  ]
});


const introEvent = Actions.filter(isIntroButton);
const mobileApplyButton = Actions.filter(isMobileApplyButton);

introEvent.filter(isApplyButton)
		  .map(toOpenIntroTweens)
		  .onValue(toTimeline);

introEvent.filter(isStartButton)
		  .map(toNextPageTweens)
		  .flatMap(toTimeline)
		  .map({ display: true })
		  .onValue(publish("FormPageDealerVisibility"));

mobileApplyButton
	.map(toMobileApplyTweens)
	.flatMap(toTimeline)
	.map({ display: true })
	.map(publish("FormIntro2Visibility"))
	.map({ display: true })
	.map(publish("FormPageNavigationVisibility"))
	.map(toShowFormTweens)
	.onValue(toTimeline);
	
//mobileApplyButton

const closeIntroEvent = Actions.filter(isCloseIntroButton).filter(isApplyButton);
closeIntroEvent.map(toCloseIntroTweens).onValue(toTimeline)
closeIntroEvent.map({ display: true }).delay(300).onValue(publish("FormPageNavigationVisibility"))
closeIntroEvent.map({ display: true }).delay(300).onValue(publish("FormIntro2Visibility"))