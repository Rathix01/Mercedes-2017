import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { Updates } from '../../input-field';

const toRegistrationFieldEvents = (state) => state.id.startsWith("RegistrationForm") || state.rootId.startsWith("RegistrationForm");
const toUpdates = (state) => state.event !== "component-mount" 
						  && state.component.startsWith("Input");

const events = Updates.filter(toRegistrationFieldEvents);
const updates = events.filter(toUpdates);

module.exports = {
	events, updates
}