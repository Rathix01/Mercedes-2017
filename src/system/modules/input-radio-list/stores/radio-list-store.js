import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const mapIndexed = R.addIndex(R.map);
const findListKey = ( id, allFields ) => R.filter((f) => id.indexOf(f) > -1, R.keys(allFields))[0];

const toRadioEvents = (state) => state.component === "InputRadio";
const toRadioLists = (state) => state.component === "InputRadioList";
const toAllLists = (prev, next) => R.merge(prev, { [next.id]: next });
const toListAndEvent = (lists, radioEvent) => ({ event: radioEvent, list: lists[ findListKey(radioEvent.id, lists) ] });
const publishToList = (state) => publish(state.id, { checked: state.checked })

const toUpdate = R.curry((state, item, index) => ({ id: state.list.id + "RadioListItem" + index, checked: false }));
const toUpdates = (state) => Bacon.fromArray(mapIndexed( toUpdate(state), state.list.items ));
const isUpdateEvents = (state) => state.componentEvent == "component-update";
const checkItem = (state) => publish(state.id, { checked: true });
const toMountEvents = (state) => state.event === "component-mount";
const toInitItem = (state) => publish(state.id + "RadioListItem0", { checked: true } );

const publishExternal = (state) => publish(`${state.list.id}Updates`, ({ ...state.event, rules: state.list.rules, value: state.event.value }));

const toTarget = (state) => R.filter((item) => { 
	return item.value === state.value }, mapIndexed((i, idx) => ({ ...i, idx }), state.items))
const toCheckTarget = (state) => ({ ...state, target: toTarget(state)[0] });
const hasTarget = (state) => state.target !== undefined;
const publishUpdate = (state) => publish(`${state.id}RadioListItem${state.target.idx}`, {checked: true});

const radioItemEvents = Actions.filter(toRadioEvents);
const radioLists = Actions.filter(toRadioLists);

const allLists = radioLists.scan({}, toAllLists);
const listAndEvent = Bacon.when([ allLists, radioItemEvents.toEventStream()], toListAndEvent);
const listUpdates = radioLists.debounce(100);

radioLists.filter(toMountEvents).onValue(toInitItem)
listAndEvent.flatMap(toUpdates).onValue(publishToList)
radioItemEvents.delay(20).onValue(checkItem);
listAndEvent.log('...').onValue(publishExternal);
listUpdates.map(toCheckTarget).filter(hasTarget).onValue(publishUpdate);
