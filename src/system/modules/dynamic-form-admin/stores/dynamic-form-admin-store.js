import R from 'ramda';
import Firebase from '../../firebase';

const formData = Firebase.data.map(R.prop("FormDefinitions"))

module.exports = {
	formData
}