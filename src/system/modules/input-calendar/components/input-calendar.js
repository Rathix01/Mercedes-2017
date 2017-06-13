import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import InputCalendarWeeks from './input-calendar-weeks';
import InputCalendarMonths from './input-calendar-months';
import { getClassName } from '../../../stores/component-helper-store';

const inputCalendar = (state) => {
    return ( <div className={ getClassName(state) }>
          This the calendar man...
          <InputCalendarMonths id={ state.id + "Months" } rootId={state.id} />
          <InputCalendarWeeks id={ state.id + "Weeks" } rootId={state.id} />
        </div>  )
  }

 export default moduleStatepublisher(inputCalendar, "InputCalendar");