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
const publishToList = (state) => publish(state.id, { checked: state.checked })

const toUpdate = R.curry((state, item, index) => ({ id: state.list.id + "CheckboxListItem" + index, checked: false }));
const toUpdates = (state) => Bacon.fromArray(mapIndexed( toUpdate(state), state.list.items ));
const checkItem = (state) => publish(state.id, { checked: state.checked });
const toMountEvents = (state) => state.event === "component-mount";
const toInitItem = (state) => publish(state.id + "CheckboxListItem0", { checked: true } );

const radioItemEvents = Actions.filter(toRadioEvents);
const radioLists = Actions.filter(toRadioLists);

const allLists = radioLists.scan({}, toAllLists);
const listAndEvent = Bacon.when([ allLists, radioItemEvents.toEventStream()], toListAndEvent)

const toCheckedState = (prev, next) => prev[next.id] && prev[next.id].checked !== undefined
										? R.merge(prev, { [next.id]: { id: next.id, checked: !prev[next.id].checked }})
										: R.merge(prev, { [next.id]: { id: next.id, checked: true }})

const toChecked = (all, next) => all[next.id];

const checkedStates = radioItemEvents.scan({}, toCheckedState)
Bacon.when([checkedStates.toProperty(), radioItemEvents.toEventStream()], toChecked).onValue(checkItem);
