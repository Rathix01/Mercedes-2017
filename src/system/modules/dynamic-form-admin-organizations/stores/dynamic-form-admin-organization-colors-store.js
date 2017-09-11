import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';
import { orgDetail } from './dynamic-form-admin-organizations-store';

const isOrgColorUpdate = R.curry((key, state) => state.id === `OrgColor${key}`);
const isUpdateEvent = (state) => state.component === "DynamicFormAdminOrganizationColors";
const toColor = R.curry((key, state) => ({ value: state[`color${key}`] }));
const toUpdateValue = (state) => ({ value: state.event.targetValue || "#555" });
const toOrgColorUpdate = (org, color1, color2, color3, color4, color5) => ({ ...org, 
													 color1: color1.value, 
													 color2: color2.value,
													 color3: color3.value,
													 color4: color4.value, })

const updateOrg = (state) => Bacon.fromPromise(Firebase.db.ref(`Orgs/${state.formsKey}`).set(state));
const publishUpdating = (state) => publish( "ColorUpdateSavingNotification", { step: "Updating" });
const publishUpdated = (state) => publish( "ColorUpdateSavingNotification", { step: "Updated" });

// NO! BAD! FIX! (Okay, this is just until the demo is over tomorrow.)
const color1Update = Actions.filter(isOrgColorUpdate(1)).map(toUpdateValue);
const color2Update = Actions.filter(isOrgColorUpdate(2)).map(toUpdateValue);
const color3Update = Actions.filter(isOrgColorUpdate(3)).map(toUpdateValue);
const color4Update = Actions.filter(isOrgColorUpdate(4)).map(toUpdateValue);
// const color5Update = Actions.filter(isOrgColorUpdate(5)).map(toUpdateValue);
const color1Load = orgDetail.map(toColor(1)).toEventStream();
const color2Load = orgDetail.map(toColor(2)).toEventStream();
const color3Load = orgDetail.map(toColor(3)).toEventStream();
const color4Load = orgDetail.map(toColor(4)).toEventStream();
// const color5Load = orgDetail.map(toColor(5)).toEventStream();

const color1 = color1Load.merge(color1Update);
const color2 = color2Load.merge(color2Update);
const color3 = color3Load.merge(color3Update);
const color4 = color4Load.merge(color4Update);
// const color5 = color5Load.merge(color5Update);
const colorUpdate = Actions.filter(isUpdateEvent);

color1.onValue(publish("DisplayOrgColor1"));
color1.onValue(publish("OrgColor1"));

color2.onValue(publish("DisplayOrgColor2"));
color2.onValue(publish("OrgColor2"));

color3.onValue(publish("DisplayOrgColor3"));
color3.onValue(publish("OrgColor3"));

color4.onValue(publish("DisplayOrgColor4"));
color4.onValue(publish("OrgColor4"));

var orgColorUpdate = Bacon.when([ orgDetail.toProperty(),
			 						color1.toProperty(), 
			 						color2.toProperty(), 
			 						color3.toProperty(),
			 						color4.toProperty(),
			 						colorUpdate.toEventStream() ], toOrgColorUpdate);

orgColorUpdate.log('updatey...').onValue(publishUpdating);
orgColorUpdate.flatMap(updateOrg).onValue(publishUpdated);
