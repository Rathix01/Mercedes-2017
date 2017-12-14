import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const mapIndexed = R.addIndex(R.map);
const findListKey = ( id, allFields ) => R.filter((f) => id.indexOf(f) > -1, R.keys(allFields))[0];

const toRadioEvents = (state) => state.component === "InputCheckbox";
const toRadioLists = (state) => state.component === "InputCheckboxList";

const toAllLists = (prev, next) => R.merge(prev, { [next.id]: next });
const toListAndEvent = (lists, radioEvent) => ({ event: radioEvent, list: lists[ findListKey(radioEvent.id, lists) ] });
const publishToList = (state) => publish(state.id, { checked: state.checked });
const publishExternal = (state) =>  publish(state.listenerId, R.omit("listenerId", state));

const toUpdate = R.curry((state, item, index) => ({ id: state.list.id + "CheckboxListItem" + index, checked: false }));
const toUpdates = (state) => Bacon.fromArray(mapIndexed( toUpdate(state), state.list.items ));
const checkItem = (state) => publish(state.id, { checked: state.checked });
const toMountEvents = (state) => state.event === "component-mount";
const isUpdateEvents = (state) => state.componentEvent == "component-update";

const toCheckedState = (prev, next) => prev[next.id] && prev[next.id].checked !== undefined
										? R.merge(prev, { [next.id]: { id: next.id, checked: !prev[next.id].checked, uniqueId: next.uniqueId, text: R.trim(next.text)}})
										: R.merge(prev, { [next.id]: { id: next.id, checked: true, uniqueId: next.uniqueId, text: R.trim(next.text) }})

const toCheckedValues = (state) =>{
	return R.map(R.prop("text"), R.filter(R.prop("checked"), state)).join(",");
}
const toSaveState = (all, next) => ({ listenerId: `${next.listRoot}Updates`, 
									  value: toCheckedValues(R.values(all)), 
									  id: next.listRoot, 
									  uniqueId: next.uniqueId });

const toChecked = (all, next) => all[next.id];
const toCheckUpdate = (state) => {
	const values = R.map(R.trim, state.value.split(","));
	const possibleValues = R.map((i) => R.trim(i.text), state.items);
	return R.map((v) => ({ index: R.indexOf(v, possibleValues), rootId: state.rootId, uniqueId: state.uniqueId }), values);
}
const toCheckTarget = (state) => ({ id: `${state.rootId}InputCheckboxListItem${state.index}`, checked: true, uniqueId: state.uniqueId, index: state.index })
const toCheckTargetText = (update, checked) => {
	return ({ ...checked, text: update.items[checked.index] ? update.items[checked.index].text : "" });
}

const radioItemEvents = Actions.filter(toRadioEvents);
const radioLists = Actions.filter(toRadioLists);

const allLists = radioLists.scan({}, toAllLists);
const listAndEvent = Bacon.when([ allLists, radioItemEvents.toEventStream()], toListAndEvent);
const listUpdates = radioLists.filter(isUpdateEvents).debounce(100);

const updateCheckedItem = listUpdates.map(toCheckUpdate).flatMap(Bacon.fromArray).map(toCheckTarget)
const checkedItems = Bacon.when([listUpdates.toProperty(), updateCheckedItem.toEventStream()], toCheckTargetText)
checkedItems.onValue(checkItem);

const checkedStates = radioItemEvents.merge(checkedItems).scan({}, toCheckedState);
Bacon.when([checkedStates.toProperty(), radioItemEvents.toEventStream()], toChecked).onValue(checkItem);
Bacon.when([checkedStates.toProperty(), radioItemEvents], toSaveState).onValue(publishExternal)

