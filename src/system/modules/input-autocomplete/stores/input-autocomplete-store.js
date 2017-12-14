import Bacon from 'baconjs';
import R from 'ramda';
import Q from 'q';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

// Temp...
import AutoCompleteDemoData from './input-autocomplete-demo-data-store';

const itemSelected = new Bacon.Bus();

const toInputAutoCompleteAction = (state) => state.component === "InputAutoComplete";
const toAutoCompleteTextAction = (state) => state.isAutoCompleteText === true;
const toAutoCompleteSelectAction = (state) => state.isAutoCompleteItem === true;
const publishToComponent = (state) => {
	if(state.event !== undefined) {
		publish(state.id, { value: state.event.targetValue });
	} 
}
const isValidNumber = R.both(R.is(Number), R.complement(R.equals(NaN)));
const concatText = (state, i) => R.reduce((arr, key) => i[key] !== undefined ? arr.concat(i[key]) : arr, [], state.searchKeys).join(", ")
const toText = (state) => ({ ...state, itemsForList: R.map((i) => ({ text: concatText(state, i) }), state.items) });
const publishToList = (state) => publish(`${state.rootId}Items`, ({ items: state.itemsForList }));
const publishSelectedText = R.curry((state, selected) => publish(state.id, ({ value: selected.text })));
const publishEmptyList = (state) => publish(state.rootId, { items: [] });
const publishUpdate = R.curry((state, selected) => {
	const nextState = R.omit("isAutoCompleteText", state);
	return publish(`${state.rootId}Updates`, { ...nextState, 
											   event: { targetValue: selected.text }, 
											   autocompleteText: selected.text } )
});
const pushToAnimation = R.curry((input, selected) => itemSelected.push({ input, selected }))
//NOTE: this function will be replaced with one that calls an API
// this is for demo purposes until we are ready for backend integration.
const toResults = (state) => {
	const d = Q.defer();
	setTimeout(() => {
		d.resolve({ ...state, 
			items: state.searchType === "address" 
					? AutoCompleteDemoData.addressResults.results
					: AutoCompleteDemoData.doctorResults.results 
		});
	}, 300);
	return Bacon.fromPromise(d.promise);
};

const toFiltered = (state) => ({ ...state, 
								  itemsForList: R.filter((i) => i.text.toLowerCase().indexOf(state.event.targetValue.toLowerCase()) > -1
								  								&& state.event.targetValue.length > 2, state.itemsForList) });
const hasValidValue = (state) => state.event !== undefined && state.event.targetValue.length > 2;
const publishToTextComponent = (state) => publish(`${state.id}AutoCompleteTextInput`, {value: state.value});


const autocompleteInputTextActions = Actions.filter(toAutoCompleteTextAction);
autocompleteInputTextActions.onValue(publishToComponent)
autocompleteInputTextActions.flatMap(toResults).map(toText).map(toFiltered).onValue(publishToList)

const inputActions = autocompleteInputTextActions//.filter(hasValidValue);//.log('i.');

autocompleteInputTextActions.onValue((state) => {
	const selectAction = Actions.filter(toAutoCompleteSelectAction);
	selectAction.map(publishSelectedText(state)).onValue(() => Bacon.noMore);
	selectAction.map(publishEmptyList).onValue(() => Bacon.noMore);
	selectAction.map(publishUpdate(state)).onValue(() => Bacon.noMore);
	selectAction.map(pushToAnimation(state)).onValue(() => Bacon.noMore)
});

Actions.filter(toInputAutoCompleteAction).onValue(publishToTextComponent);
//Actions.filter(toInputAutoCompleteAction).onValue(publishUpdate);

module.exports = {
	inputActions, itemSelected
}