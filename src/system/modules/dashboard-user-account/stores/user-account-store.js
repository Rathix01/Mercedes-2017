import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { ProfileStore } from '../../server';
import Connection from '../../utilities/connection';

const toDashboardAccountUpdates = (state) => state.component === "DashboardUserAccount" && state.username.length > 1;

const userAccountUpdates = Actions.filter(toDashboardAccountUpdates); 
const profile = userAccountUpdates.flatMap(ProfileStore.getUserProfileStream())

profile.onValue(publish("UserAccount"));
