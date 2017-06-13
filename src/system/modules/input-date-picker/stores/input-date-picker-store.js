import Actions from '../../../../actions/actions';

const toDatePickerEvents = (state) => state.component === "InputDatePicker";
const toCalendarClicks = (state) => state.event.target 
									&& state.event.target.tagName === "I" 
									&& state.event.target.className.indexOf("fa-calendar");

const datePickerEvents = Actions.filter(toDatePickerEvents);
const calendarClicks = datePickerEvents.filter(toCalendarClicks);

module.exports = {
	calendarClicks
}