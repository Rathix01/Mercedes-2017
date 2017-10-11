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
const readQueryString = () => window.location.search.substr(1).split('&');
const getQueryStringValue = (key) => readQueryString().length > 0
									? R.filter((i) => i.indexOf(key) > -1, readQueryString()) : [];
const getValueForKey = (key) => getQueryStringValue(key).length > 0
									? getQueryStringValue(key)[0].split("=")[1] : "";						

const decode = (key) => key.split("+").join(" "); //key.replace("+", " ");
const urlHasValueFor = R.curry((prop, key) => key[prop] !== "" && key.length > 0);
const toUrlValue = (key) => ({ value: key })

const data = Firebase.data.take(1);
const formDefinitionData = Firebase.data.map(R.prop("FormDefinitions"));
const orgData = Firebase.data.map(R.prop("Orgs"));
const formDeleteData = Firebase.data.map(R.prop("DeletedForms"));
const orgNames = data.map(toOrgNames);
const orgSelectActionValue = Actions.filter(toOrgSelectAction).map(toValue);

const urlOrg = Bacon.once(decode(getValueForKey('org'))).filter(urlHasValueFor("org")).toProperty();
const urlForm = Bacon.once(decode(getValueForKey('form'))).filter(urlHasValueFor("form")).toProperty();
const urlPublish = Bacon.once(decode(getValueForKey('publish'))).filter(urlHasValueFor("publish")).toProperty({});

const devOrgSet = Bacon.when([ urlOrg, data.toEventStream() ], d => d);
const orgSelectAction = orgSelectActionValue.merge(devOrgSet);

const formNamesForOrg = Bacon.when([ data.toProperty(), orgSelectAction.toEventStream() ], getFormsForOrg)
const firstFormForOrg = Bacon.when([ data.toProperty(), orgSelectAction.toEventStream() ], getFormDefinitionsForOrg).map(toFirstForm)

const formSelectAction = Actions.filter(toFormSelectActions).map(toValue);
const formSelect = formSelectAction.toEventStream().merge(firstFormForOrg).merge(urlForm.toEventStream().debounce(1000));

orgNames.onValue(publish("OrgSelect"));
orgSelectAction.map(toValueState).onValue(publish("OrgSelect"));
//formNamesForOrg.log('?').onValue(publish("OrgFormsSelect"));

const orgAndForm  = Bacon.when([ orgSelectAction.toProperty(), formSelect.toEventStream() ], toOrgAndForm);
orgAndForm.onValue(publish("AdminOrgAndForm"));

urlOrg.map({ display: false }).onValue(publish("OrgSelectVisibility"));
urlForm.map({ display: false }).onValue(publish("OrgAndFormVisibility"));

urlOrg.map(toUrlValue).onValue(publish("OrgSelectionValue"));
urlForm.map(toUrlValue).onValue(publish("FormSelectionValue"));

urlForm.map({ display: true }).onValue(publish("OrgAndFormsSelectionValues"));


const filterDeletedForms = (deleted, definitions, org ) => {

	const d = R.map( (k) => {

		const deletedForOrg = deleted[k];
		const orgForms = definitions[k];

		const forms =  R.reduce((state, key) => {
			return deletedForOrg === undefined || deletedForOrg[key] === undefined 
				? { ...state, [key]: orgForms[key] }
				: { ...state }
			
		}, {}, R.keys(orgForms));

		return { [k]: forms };

	}, R.keys(definitions))

	const validDefintions = R.reduce((state, i) => {  
		return ({ ...state, [R.keys(i)[0]]: i[R.keys(i)[0]] })
	}, {}, d)

	return { items: R.keys(validDefintions[org]) }
}

const formData = Bacon.when([ formDeleteData.toProperty(), formDefinitionData.toEventStream(), orgSelectAction.toEventStream() ], filterDeletedForms)
formData.onValue(publish("OrgFormsSelect"));

module.exports = {
	orgAndForm, urlOrg, urlForm, urlPublish
}

