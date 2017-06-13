import Bacon from 'baconjs';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toLogoActions = (state) => state.id === "HeaderLogo" && state.component === "Logo";
const toLoginClick = (state) => state.event.target.tagName === "BUTTON"
const toNotLoginClick = (state) => !toLoginClick(state);
const toMouseOver = (state) => state.event.type === "mouseover";
const toNextPosition = (existing, next) => ({ position: existing.position >= 5 ? 0 : (existing.position + 1) })
const toTextByPosition = (position) => [ "Innovative", "Fun", "Online", "Simple", "Affordable", "Customizable" ][position];
const toTextValue = (state) => ({ value: toTextByPosition(state.position) });
const redirectToLogin = (state) => window.open('http://test.volo.nz/login');

const headerActions = Actions.filter(toLogoActions).toProperty();
const logoActions = headerActions.filter(toNotLoginClick).toProperty();
const loginActions = headerActions.filter(toLoginClick).toProperty();
const tick = Bacon.interval(800).toEventStream();

const logoUpdates = Bacon.when([ logoActions, tick ], (a) => a).filter(toMouseOver);
const logoTextPosition = logoUpdates.scan({ position: 0 }, toNextPosition).map(toTextValue);

logoTextPosition.onValue(publish("HeaderLogo"));
loginActions.onValue(redirectToLogin);
