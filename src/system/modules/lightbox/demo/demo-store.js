import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toDemoLightboxEvents = (state) => state.component === "LightboxDemo";
const toDisplayTrue = (state) => ({ display: true });

const demoTextEvents = Actions.filter(toDemoLightboxEvents)
demoTextEvents.map(toDisplayTrue).onValue(publish("DemoLightbox"))
