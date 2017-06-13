import publish from '../../../stores/state-store';
import { calendarData } from './input-calendar-store';

const getWeeks = (state) => {

    var firstOfMonth = state.date.clone().startOf('month');
    var lastOfMonth = state.date.clone().endOf('month');

    var currentDay = firstOfMonth.clone();
    var currentWeek = [];
    var weeksInMonth = [];

    while (currentDay < lastOfMonth) {
      currentWeek.push({ day: currentDay.clone().format("DD"), 
                         month: currentDay.clone().format("MM"), 
                         year: currentDay.clone().format("YYYY"),
                         date: currentDay.clone().format("DD/MM/YYYY") });
      currentDay.add(1, 'd');

      if (currentDay.weekday() === 0 || currentDay > lastOfMonth) {
        weeksInMonth.push(currentWeek);
        currentWeek = [];
      }
    }

    return { ...state, weeksInMonth };
}

const publishWeeks = (state) => publish(state.id + "Weeks", { weeksInMonth: state.weeksInMonth, selectedDay: state.date.format("DD") })

const calendarDataWithWeeks = calendarData.map(getWeeks);
calendarDataWithWeeks.onValue(publishWeeks);