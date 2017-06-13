import React from 'react';
import R from 'ramda';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';

const renderDays = R.curry((state, d) => <div data-date={ d.date } data-is-day="true" key={ "day" + d.day } onClick={state.handleEvent}>{ d.day }</div>);
const renderWeek = R.curry((state, week) => <div key={ "week-starting-" + week[0].day }> { week.map( renderDays(state) ) } </div> );
const getWeeksArray = (state) => state.weeksInMonth ? state.weeksInMonth : []; 

const inputCalendarWeeks = (state) => {
    return ( <div className={ getClassName(state) }>
          { getWeeksArray(state).map(renderWeek(state)) }
        </div>  )
  }

 export default readAndWrite(inputCalendarWeeks, "InputCalendarWeeks");