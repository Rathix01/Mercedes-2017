import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { footerButtonEvents } from '../../footer-buttons';

const toEvent = R.curry((key, state) => state.event.target && state.event.target.innerText === key);
const toDisplay = R.curry((shouldBe, state) => R.merge(state, { display: shouldBe }));
const toLightboxEvent = (state) => state.component === "Lightbox";
const closeLightBox = (state) => publish(state.id, { display: false });

const faqEvents = footerButtonEvents.filter(toEvent("FAQ"));
const termsEvents = footerButtonEvents.filter(toEvent("Terms & Conditions"));
const privacyPolicyEvents = footerButtonEvents.filter(toEvent("Privacy Policy"));

Actions.filter(toLightboxEvent).onValue(closeLightBox);

faqEvents.map(toDisplay(true)).onValue(publish("FAQLightbox"));
termsEvents.map(toDisplay(true)).onValue(publish("TermsAndConditionsLightbox"));
privacyPolicyEvents.map(toDisplay(true)).onValue(publish("PrivacyPolicyLightbox"));
