import publish from '../../../stores/state-store';
import { calendarData } from './input-calendar-store';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const getMonths = (state) => ({ ...state, months });
const publishMonths = (state) => publish(state.id + "Months", { months: state.months, 
                                                                prevSelectedMonth: state.date.format("MM"), 
                                                                monthText: state.date.format("MMM"), 
                                                                date: state.date.format("DD/MM/YYYY") })

const calendarDataWithMonths = calendarData.map(getMonths);
calendarDataWithMonths.onValue(publishMonths);