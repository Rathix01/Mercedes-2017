import React from 'react';
import R from 'ramda';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';

const getMonthsArray = (state) => state.months ? state.months : [];
const toMonths = R.curry((state, m) => <div data-date={ state.date } key={ state.id + m } onClick={state.handleEvent}>{ m }</div>)

const inputCalendarMonths = (state) => {
    return ( <div className={ getClassName(state) }>
    	  <div>{ state.monthText }</div>
          <div>{ getMonthsArray(state).map(toMonths(state)) }</div>
        </div>  )
  }

 export default readAndWrite(inputCalendarMonths, "InputCalendarMonths");