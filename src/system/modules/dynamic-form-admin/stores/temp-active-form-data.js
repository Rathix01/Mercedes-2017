import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

//dynamicFormAdminLightboxSaveForm

const toIsCloseLightbox = (state) => state.component === "dynamicFormAdminLightboxSaveForm";

Actions.filter(toIsCloseLightbox).map({display: false}).onValue(publish("SaveForm"));

console.log('foo?')