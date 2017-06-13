import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

publish("RegistrationForms", { items: [ 0, 0 ] })