import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';

import { validLoginAttempt } from './login-form-store';
import { validLogin, invalidLogin } from './login-authentication-store';
import { colors } from '../../../styles/variables.style.js';

// Absolutely terrible names. Just awful.
const vShort = 0.01;
const kindaShort = 0.4;
const medium =  0.6;
const notShort =  0.8;

const toHideLoginFormTweens = (state) => ({
	tweenProps: [{
			time: kindaShort,
			fn: "fromTo", 
			label: "hideLoginForm", 
			target: "LoginFormAnimation", 
			from: { scale: 1,opacity: 1, y: 0 }, 
			to: { scale: 0.98,opacity: 0, y: -100, ease: Back.easeInOut }
		},
		{
			time: vShort,
			fn: "fromTo", 
			label: "loggingInShows", 
			target: "LoginLoadingAnimation", 
			from: { scale: 0.98, opacity: 0 }, 
			to: { scale: 0.98, opacity: 0, ease: Linear.easeNone }
		}
	]
});

const toShowLoginLoadingTweens = (state) => ({
	tweenProps: [{
			time: kindaShort,
			fn: "fromTo", 
			label: "loggingInShows1", 
			target: "LoginLoadingAnimation", 
			from: { scale: 0.98, opacity: 0 }, 
			to: { scale: 1, opacity: 0.5, ease: Power1.easeIn }
		},
		{
			time: notShort,
			fn: "fromTo", 
			label: "loggingInShows2", 
			target: "LoginLoadingAnimation", 
			from: { opacity: 0.5 }, 
			to: { opacity: 1, ease: Power1.easeOut }
		},
		{
			time: medium,
			fn: "fromTo", 
			label: "loggingInShows3", 
			target: "LoginLoadingAnimation", 
			from: { opacity: 1 }, 
			to: { opacity: 0.2, ease: Power1.easeIn, delay: 0.05 }
		},
		,
		{
			time: medium,
			fn: "fromTo", 
			label: "loggingInShows4", 
			target: "LoginLoadingAnimation", 
			from: { opacity: 0.2 }, 
			to: { opacity: 1, ease: Power1.easeOut }
		}
	]
});

const toHideLoginLoadingTweens = (state) => ({
	tweenProps: [{
			time: kindaShort,
			fn: "fromTo", 
			label: "loggingInShows", 
			target: "LoginLoadingAnimation", 
			from: { y: 0, opacity: 1 }, 
			to: { y: -100, opacity: 0, ease: Back.easeIn }
		},{
			time: vShort,
			fn: "staggerFromTo", 
			label: "dashboardShows", 
			target: "DashboardSectionsListListItem0Animation DashboardSectionsListListItem1Animation DashboardSectionsListListItem2Animation DashboardSectionsListListItem3Animation DashboardSectionsListListItem4Animation DashboardSectionsListListItem5Animation", 
			from: { opacity: 0, scale: 0.90 }, 
			to: { opacity: 0, scale: 0.90, ease: Linear.easeNone },
			stagger: 0.1
		}
	]
});

//DashboardSectionsListListItem0
const toDashboardShows = (state) => ({
	tweenProps: [{
			time: kindaShort,
			fn: "fromTo", 
			label: "dashboardShows", 
			target: "DashboardContainerAnimation", 
			from: { opacity: 0, }, 
			to: { opacity: 1, ease: Linear.easeNone }
		},{
			time: kindaShort,
			fn: "staggerFromTo", 
			label: "dashboardDances", 
			target: "DashboardSectionsListListItem5Animation DashboardSectionsListListItem4Animation DashboardSectionsListListItem3Animation DashboardSectionsListListItem2Animation DashboardSectionsListListItem1Animation DashboardSectionsListListItem0Animation", 
			from: { opacity: 0, scale: 0.90 }, 
			to: { opacity: 1, scale: 1, ease: Power2.easeOut, delay: 0.2 },
			stagger: 0.1
		},
	]
});


const loginFormHides = validLoginAttempt.delay(50).map(toHideLoginFormTweens).flatMap(toTimeline);

loginFormHides.map({ display: true }).onValue(publish("LoginLoadingVisibility"));
const loadingShows = loginFormHides.map(toShowLoginLoadingTweens).log('anim...').flatMap(toTimeline);

// Bring dashboard on.
const loadingHides = loadingShows.debounce(600).map(toHideLoginLoadingTweens).flatMap(toTimeline);

loadingHides.map({ display: false }).onValue(publish("LoginVisibility"));
loadingHides.debounce(120).map({ display: true }).onValue(publish("DashboardVisibility"));

Bacon.once({}).debounce(1000).map(toDashboardShows).onValue(toTimeline);
loadingHides.map(toDashboardShows).onValue(toTimeline);