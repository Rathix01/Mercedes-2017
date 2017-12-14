import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';


const toAddressNextEvent = (state) => state.id === "AddressNextButton";

const nextButtonEvent = Actions.filter(toAddressNextEvent);

nextButtonEvent.map({ display: false }).onValue(publish("FormPageAddressVisibility"))
nextButtonEvent.map({ display: true }).onValue(publish("FormPageAboutYouVisibility"))
