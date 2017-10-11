import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';

const filterDeletedForms = (deleted, definitions) => {

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

	return validDefintions
}


const formDefinitionData = Firebase.data.map(R.prop("FormDefinitions"));
const orgData = Firebase.data.map(R.prop("Orgs"));
const formDeleteData = Firebase.data.map(R.prop("DeletedForms"));

const formData = Bacon.when([ formDeleteData.toProperty(), formDefinitionData.toEventStream() ], filterDeletedForms)

module.exports = {
	formData, orgData
}