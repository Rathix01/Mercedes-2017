import Bacon from 'baconjs';
import R from 'ramda';
import fetchPolyfill from 'fetch-polyfill';
import Actions from '../../../actions/actions';


const modelTypeData = ["A","B","CLA","C","SLC","E","CLS","GLA","GLC","GLE","GLS","G","S","SL","AMG","GT","MaybachS","V"];
const selectedMenuValue = { value: "A" }
const carData = [
	{
		uniqueId: 1,
		name: "GLE 250 d 4MATIC",
		rrp: 112790,
		from: 262,
		type: ["GLE"],
	},
	{
		uniqueId: 2,
		name: "GLE 350 d 4MATIC",
		rrp: 132290,
		from: 302,
		type: ["GLE"],
	},
	{
		uniqueId: 3,
		name: "GLE 500 e 4MATIC",
		rrp: 153290,
		from: 342,
		type: ["GLE"],
	},
	{
		uniqueId: 2,
		name: "Mercedes-AMG GLE 43 4MATIC",
		rrp: 156290,
		from: 365,
		type: ["GLE", "AMG"],
	},
	{
		uniqueId: 3,
		name: "Mercedes-AMG GLE 63 S",
		rrp: 210290,
		from: 415,
		type: ["GLE", "AMG", "S"],
	},
];

const dealerData = [
	{
		dealerId: 1,
		title: "Mercedes-Benz",
		location: "Auckland",
		addressLine1: "2 Great South Road",
		addressLine2: "New Market",
		addressLine3: "Auckland",
		phone: "(09) 529 3888",
		fax: "(09) 529 3887",
		website: "www.mbauckland.co.nz",
	},
	{
		dealerId: 2,
		title: "Mercedes-Benz",
		location: "North Shore Auckland",
		addressLine1: "145 Diana Drive",
		addressLine2: "Wairau Valley",
		addressLine3: "Auckland 0627",
		phone: "(09) 443 3808",
		fax: "(09) 442 2480",
		website: "www.mbnorthshore.co.nz",
	},
	{
		dealerId: 3,
		title: "Mercedes-Benz",
		location: "Botany",
		addressLine1: "279 Ti Rakau Drive",
		addressLine2: "Botany Downs",
		addressLine3: "Auckland 2013",
		phone: "(09) 529 3888",
		website: "www.mbbotany.co.nz",
	},
]

// for the sake of making a dummy data request
const dummyUrl = "https://api.github.com/users";

// streams for outside consumption of data.
const cars = new Bacon.Bus();
const modelTypes = new Bacon.Bus();
const selectedMenuItem = new Bacon.Bus();
const dealers = new Bacon.Bus();
 
 // functions for making the request and parsing it.
 // TODO -> Handle any error as critical to the whole process. Stream a did not load message to error component.
const status = (response) => (response.status >= 200 && response.status < 300) ? response : new Error(response.statusText)
const toJson = (response) => response.json();
const fetchData = (url) => Bacon.fromPromise(fetch(dummyUrl).then(status).then(toJson));

// determine that events are from the menu
const toMenuOptionSelection = (state) => state.component === "MercedesBenzWebsiteFrontPageMenuItem";
// filter the car data by the selected menu item.
const toCarsForMenuOption = (cars, filter) => R.filter((c) => R.contains(filter.text, c.type), cars)

// publish data by pushing it to relevant streams.
const publishToCars = (state) => cars.push(state);
const publishToModels = (state) => modelTypes.push(state);
const publishToDealers = (state) => dealers.push(state);

// initiate requests for data. (TOREMOVE ->, transform into dummy array data);
const carDataS = fetchData('/cars').map(carData);
const modelTypeDataS = fetchData('/modelTypes').map(modelTypeData);
const dealerDataS = fetchData('/dealers').map(dealerData);

// Listen for menu actions
const menuUpdateAction = Actions.filter(toMenuOptionSelection);
// When menu actions are fired pass the menu object and the cars into the function for filtering.
const dataUpdate = Bacon.when([carDataS.toProperty(), menuUpdateAction ], toCarsForMenuOption);

// push data to the external publishing functions.
dataUpdate.onValue(publishToCars);
carDataS.onValue(publishToCars);
modelTypeDataS.onValue(publishToModels);
dealerDataS.onValue(publishToDealers);

// set a default menu item.
// TODO, set this after the menu items are established, 
// select the first option by default
setTimeout(() => selectedMenuItem.push(selectedMenuValue), 0)

export default { cars, modelTypes, selectedMenuItem, dealers }