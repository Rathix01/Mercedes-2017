import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toOrgSelectAction = (state) => state.id === "OrgSelect";
const toFormSelectActions = (state) => state.id === "OrgFormsSelect";
const toOrgNames = (state) => ({ items: R.prepend( "", R.keys(state.FormDefinitions)) });
const getFormsForOrg = (data, selection) => ({ items: R.keys(data.FormDefinitions[selection]) });
const getFormDefinitionsForOrg = (data, selection) => data.FormDefinitions[selection];
const toOrgAndForm = (org, form) => ({ org, form });
const toFirstForm = (state) => R.head(R.keys(state));
const toValue = (state) => state.event.target.value;
const toValueState = (state) => ({ value: state });

const data = Firebase.data.take(1);
const orgNames = data.map(toOrgNames);
const orgSelectActionValue = Actions.filter(toOrgSelectAction).map(toValue);

//NOTE, DEV OPTION HERE NEEDS TO BE REPLACED WITH URL READ.
const devOrgSet = Bacon.when([ Bacon.once("St Vincents").toProperty(), data.toEventStream() ], d => d)//.debounce(200);
const orgSelectAction = orgSelectActionValue.merge(devOrgSet);

const formNamesForOrg = Bacon.when([ data.toProperty(), orgSelectAction.toEventStream() ], getFormsForOrg)
const firstFormForOrg = Bacon.when([ data.toProperty(), orgSelectAction.toEventStream() ], getFormDefinitionsForOrg).map(toFirstForm)

const formSelectAction = Actions.filter(toFormSelectActions).map(toValue);
const formSelect = formSelectAction.toEventStream().merge(firstFormForOrg);

orgNames.onValue(publish("OrgSelect"));
orgSelectAction.map(toValueState).onValue(publish("OrgSelect"));
formNamesForOrg.onValue(publish("OrgFormsSelect"));

const orgAndForm  = Bacon.when([ orgSelectAction.toProperty(), formSelect.toEventStream() ], toOrgAndForm);
orgAndForm.onValue(publish("AdminOrgAndForm"));

module.exports = {
	orgAndForm
}

