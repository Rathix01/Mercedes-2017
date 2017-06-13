import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import AnimationContainer from '../../animation-container';
import VisibilityContainer from '../../visibility-container';
import InputCalendar from '../../input-calendar';

//import { getClassName } from '../../../stores/component-helper-store';

const InputCalendarContainer = (state) => {
	//console.log(state);
return  <VisibilityContainer id={ state.id + "Visibility" } className="calendar">
			<AnimationContainer id={ state.id + "Animation" }>
				<InputCalendar id={ state.id + "Calendar" } />
			</AnimationContainer>
	</VisibilityContainer>
}

export default readAndWrite(InputCalendarContainer, "InputCalendarContainer")