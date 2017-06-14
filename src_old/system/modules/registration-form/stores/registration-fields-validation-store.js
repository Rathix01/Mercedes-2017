import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { events, updates } from './registration-fields-store';

const publishToValidationInit = (state) => publish(state.id + "InputValidation", { inputState: state });
const publishToValidationUpdate = (state) => publish(state.id + "Validation", { inputState: state });

events.onValue(publishToValidationInit);
updates.onValue(publishToValidationUpdate);
