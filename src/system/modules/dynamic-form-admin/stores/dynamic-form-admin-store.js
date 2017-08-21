import R from 'ramda';
import Firebase from '../../firebase';

const formData = Firebase.data.map(R.prop("FormDefinitions"));
const orgData = Firebase.data.map(R.prop("Orgs"));

module.exports = {
	formData, orgData
}