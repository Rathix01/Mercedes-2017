import Bacon from 'baconjs';
import R from 'ramda';
import M from 'moment';
import Actions from '../../../../actions/actions';


const calendarUpdateBus = new Bacon.Bus();

const toCalendarUpdate = (state) => ({ id: state.rootId, date: state.date })
const pushToUpdateBus = (state) => calendarUpdateBus.push(state);

const toUpdateBus = (state) => {
	const nextBus = new Bacon.Bus();
	nextBus.map(toCalendarUpdate)
		   .debounceImmediate(100)
		   .onValue(pushToUpdateBus);

	return nextBus;
}

const isCalendarComponent = (state) => state.component === "InputCalendar";
const isCalendarMountEvent = (state) => state.event === "component-mount";
const toTodaysDate = (state) => ({ ...state, date: M.utc() });
const toDaySelectEvent = (state) => state.component === "InputCalendarWeeks";
const toDayUpdate = (state) => ({ ...state, date: M.utc(state.event.target.getAttribute('data-date')) });

const createUpdateBusByKey = ( prev, next ) => prev[next.id] === undefined 
												? R.merge(prev, { [next.id]: toUpdateBus(next) })
												: prev;



const findStream = R.curry((id, streamKey) => id.indexOf(streamKey) !== -1 )
const getStreamId = (streams, update) => R.filter( findStream(update.id), R.keys(streams))[0]
const toStreamByUpdate = (streams, update) => ({ update, stream: streams[getStreamId(streams, update)] });
const pushToStream = (state) => state.stream.push(state.update);


const calendarEvents = Actions.filter(isCalendarComponent);
const calendarMount = calendarEvents.filter(isCalendarMountEvent);
const calendarDaySelect = Actions.filter(toDaySelectEvent);

const initDate =  calendarMount.map(toTodaysDate);
const dayUpdate = calendarDaySelect.map( toDayUpdate );
 
const calendarData = initDate.merge(calendarUpdateBus.toEventStream());

const updateStreams = initDate.scan({}, createUpdateBusByKey);
const updatesAndValidationStreams = Bacon.when([ updateStreams, dayUpdate ], toStreamByUpdate);
updatesAndValidationStreams.onValue(pushToStream);

//calendarDaySelect.log('..>>')
calendarData.log('select..')

module.exports = {
	calendarData
};
