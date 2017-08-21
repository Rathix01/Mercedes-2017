import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const db = Firebase.db;
const toOrgSelectionAction = (state) => state.id === "AdminOrgAndForm" && state.org !== undefined;
const toOrgValue = (state) => ({ org: state.org });
const toRequestOrgDetails = (state) => Bacon.fromPromise(db.ref(`Orgs/${state.org}`).once('value'));
const toValue = (snapshot) => snapshot.val();
const toIsDuplicate = (prev, next) => R.merge(next, { isDuplicate: prev.org === next.org  });
const isOrgValueUpdate = (state) => !state.isDuplicate;

const orgValue = Actions.filter(toOrgSelectionAction)
						.map(toOrgValue)
						.scan({ isDuplicate: false, org: "" }, toIsDuplicate);

const orgValueUpdate = orgValue.filter(isOrgValueUpdate).toEventStream().skip(1);
const orgDetail = orgValueUpdate.flatMap(toRequestOrgDetails).map(toValue);
orgDetail.onValue(publish("DynamicFormAdminOrgDetails"));

// window.injectOrg = () => {
// 	Firebase.db.ref(`/Orgs/St Vincents/`).set({ 
// 		displayName: "St Vincents",
// 		formsKey: "St Vincents",
// 		color1: "#48378D",
// 		color2: "#0C68AF",
// 	});
// }

module.exports = {
	orgDetail
}
