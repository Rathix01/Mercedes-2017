import React from 'react'
import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const isDateInput = (state) => state.component === "InputDatePicker";
const isMountEvent = (state) => state.componentEvent === "component-mount";
const isUpdateEvent = (state) => state.componentEvent === "component-update";
const toEvents = R.curry((key, state) => state.id === `${state.rootId}InternalValue${key}`);
const publishComponentValue = (state) => publish(state.id, { value: state.event.targetValue });
const toDate = (prev, next) => prev === undefined 
								? { [next.placeholder]: next.event.targetValue } 
								: { ...prev, [next.placeholder]: next.event.targetValue };
const toDateFieldsByKey = (prev, next) => R.merge(prev, { [next.rootId]: toDate(prev[next.rootId], next) });
const toDateForKey = (dates, update) => ({ update, date: dates[update.rootId] });
const toDateFields = (prev, next) => R.merge(prev, { [next.id]: next });
const toDateString = (date) => ({ value: `${ date.YYYY || "" }/${ date.MM || "" }/${ date.DD || "" }` }) 
const toDateUpdate = (dateFields, dateAtKey) => R.merge(dateFields[dateAtKey.update.rootId], toDateString(dateAtKey.date));
const publishDate = (state) => publish(`${state.rootId}InputUpdates`, { ...state, event: { targetValue: state.value } });

const toDayFromUpdate = (state) => ({ 
	event: { targetValue: R.trim(state.value.substring((state.value.lastIndexOf("/") + 1), state.value.length)) }, 
	id: `${state.rootId}InputInternalValueDay`,
	rootId: `${state.rootId}Input`,
	placeholder: "DD",
})
const toMonthFromUpdate = (state) => ({ 
	event: { targetValue: R.trim(state.value.substring((state.value.indexOf("/") + 1), state.value.lastIndexOf("/"))) },
	id: `${state.rootId}InputInternalValueMonth`,
	rootId: `${state.rootId}Input`,
	placeholder: "MM",
})
const toYearFromUpdate = (state) => ({ 
	event: { targetValue: R.trim(state.value.substring(0, state.value.indexOf("/"))) },
	id: `${state.rootId}InputInternalValueYear`,
	rootId: `${state.rootId}Input`,
	placeholder: "YYYY",
})

const dateFields = Actions.filter(isDateInput).filter(isMountEvent).scan({}, toDateFields);
const dateUpdates = Actions.filter(isDateInput).filter(isUpdateEvent)

const dayUpdate = dateUpdates.map(toDayFromUpdate);
const monthUpdate = dateUpdates.map(toMonthFromUpdate);
const yearUpdate = dateUpdates.map(toYearFromUpdate);

const dayUpdateEvents = Actions.filter(toEvents("Day")).toEventStream().merge(dayUpdate);
const monthUpdateEvents = Actions.filter(toEvents("Month")).toEventStream().merge(monthUpdate);
const yearUpdateEvents = Actions.filter(toEvents("Year")).toEventStream().merge(yearUpdate);

const updates = dayUpdateEvents.merge(monthUpdateEvents).merge(yearUpdateEvents);
const dates = updates.scan({}, toDateFieldsByKey);

const dateForKey = Bacon.when([ dates.toProperty(), updates.toEventStream() ], toDateForKey)
const dateUpdate = Bacon.when([dateFields, dateForKey], toDateUpdate);

dateUpdate.onValue(publishDate);
updates.onValue(publishComponentValue);
