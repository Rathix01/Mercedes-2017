import Bacon from 'baconjs';
import firebase from 'firebase';

console.log('firebase')

// DB Config. Probably shouldnt live here.
const config = {
	apiKey: "voloNZ",
	authDomain: "volonz.firebaseapp.com",
	databaseURL: "https://volonz.firebaseio.com/",
};

firebase.initializeApp(config);

// Get a reference to the database service
const db = firebase.database();
// A stream for the data (when loaded);
const data = new Bacon.Bus();

db.ref('/').on('value', (snapshot) => {
	console.log('data loaded')
	data.push(snapshot.val())
});

export default { data, db }