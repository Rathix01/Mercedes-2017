import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

window.openPanel = new Bacon.Bus();
window.closePanel = new Bacon.Bus();

const toSlidePanelInit = (state) => state.component === "SlidePanel" && state.componentEvent === "component-mount";
const toInitState = (state) => ({ y: 0, opacity: 0 });

const toOpenTweens = (state) => ({
	tweenProps: [{ 
			time: 0.4,
			fn: "fromTo", 
			label: "detailOpen", 
			target: "DataControlsAnimation", 
			from: { opacity: 0, y:0 }, 
			to: { opacity: 1, y:-210, ease: Back.easeOut }
		}
	]
});

const toCloseTweens = (state) => ({
	tweenProps: [{ 
			time: 0.4,
			fn: "fromTo", 
			label: "detailOpen", 
			target: "DataControlsAnimation", 
			from: { opacity: 1, y:-210 }, 
			to: { opacity: 0, y: 0, ease: Back.easeIn }
		}
	]
});

const slidePanelInit = Actions.filter(toSlidePanelInit);

slidePanelInit.map(toInitState).onValue(publish("DataControlsAnimation"));

openPanel.map(toOpenTweens).onValue(toTimeline);
closePanel.map(toCloseTweens).onValue(toTimeline);
