import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import { ProfileStore } from '../../server';

const toDisplayLogin = R.curry((shouldBe, state) => ({ display: shouldBe }));
const flipDisplay = (state) => ({ display: !state.display });

const clientIdentityStream = ProfileStore.getClientIdentityStream();

const loggedIn = clientIdentityStream.skipErrors().map(toDisplayLogin(false));
const notLoggedIn = clientIdentityStream.mapError(toDisplayLogin(true));

const login = loggedIn.merge(notLoggedIn);

login.onValue(publish("LoginVisibility"));
login.map(flipDisplay).onValue(publish("DashboardVisibility"));

login.onValue(publish("DashboardAccount"));

module.exports = {
	login, loggedIn, notLoggedIn
}

