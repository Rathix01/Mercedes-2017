import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import CalendarContainer from './input-calendar-container';
import { getClassName } from '../../../stores/component-helper-store';

const InputDatePicker = (state) => {
	return <div>
		<input type='text' className={getClassName(state)} />
		<div>
			<i className='fa fa-calendar' onClick={state.handleEvent} />
		</div>
		<CalendarContainer id={ state.id + "Container" } rootId={ state.id } />
	</div>
}

export default readAndWrite(InputDatePicker, "InputDatePicker");