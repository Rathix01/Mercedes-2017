import React from 'react';
import moduleStatePublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';
import InputText from '../../input-text';
import CalendarContainer from './input-calendar-container';
import { getClassName } from '../../../stores/component-helper-store';
import { container, field } from '../styles';

const InputDatePicker = (state) => {
	return <div className={container}>
		<InputText id={ `${state.id}InternalValueDay` } placeholder="DD" className={field} rootId={state.id} />
		<InputText id={ `${state.id}InternalValueMonth` } placeholder="MM" className={field} rootId={state.id} />
		<InputText id={ `${state.id}InternalValueYear` } placeholder="YYYY" className={field} rootId={state.id} />
		<StateListener id={ `${state.id}Updates` } isQuestion={ true } label="Label" formInputType="InputDatePicker"  />
	</div>
}

export default moduleStatePublisher(InputDatePicker, "InputDatePicker");

