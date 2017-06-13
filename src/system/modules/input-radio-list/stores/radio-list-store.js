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
const checkItem = (state) => publish(state.id, { checked: true });
const toMountEvents = (state) => state.event === "component-mount";
const toInitItem = (state) => publish(state.id + "RadioListItem0", { checked: true } );

const radioItemEvents = Actions.filter(toRadioEvents);
const radioLists = Actions.filter(toRadioLists);

const allLists = radioLists.scan({}, toAllLists);
const listAndEvent = Bacon.when([ allLists, radioItemEvents.toEventStream()], toListAndEvent)

radioLists.filter(toMountEvents).onValue(toInitItem)

listAndEvent.flatMap(toUpdates).onValue(publishToList)
radioItemEvents.delay(20).onValue(checkItem);