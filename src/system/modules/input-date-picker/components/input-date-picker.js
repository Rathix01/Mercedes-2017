import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import CalendarContainer from './input-calendar-container';
import { getClassName } from '../../../stores/component-helper-store';
import { container, field } from '../styles';

const InputDatePicker = (state) => {
	return <div className={container}>
		<input type='text' className={field} placeholder='DD' 	onChange={state.handleEvent}  />
		<input type='text' className={field} placeholder='MM' 	onChange={state.handleEvent}  />
		<input type='text' className={field} placeholder='YYYY' onChange={state.handleEvent}  />
	</div>
}

export default readAndWrite(InputDatePicker, "InputDatePicker");



// const InputDatePicker = (state) => {
// 	return <div>
// 		<input type='text' className={getClassName(state)} />
// 		<div>
// 			<i className='fa fa-calendar' onClick={state.handleEvent} />
// 		</div>
// 		<CalendarContainer id={ state.id + "Container" } rootId={ state.id } />
// 	</div>
// }

// export default readAndWrite(InputDatePicker, "InputDatePicker");