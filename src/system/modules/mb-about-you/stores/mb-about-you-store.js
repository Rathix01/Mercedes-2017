import Bacon from 'baconjs';
import R from 'ramda';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';
import { toTimeline } from '../../../stores/animation-store';
import Services from '../../mb-services';


const toAboutYouNextEvent = (state) => state.id === "AboutYouNextButton";

const nextButtonEvent = Actions.filter(toAboutYouNextEvent);

nextButtonEvent.map({ display: false }).onValue(publish("FormPageAboutYouVisibility"))
nextButtonEvent.map({ display: true }).onValue(publish("FormPageIncomeDetailsVisibility"))