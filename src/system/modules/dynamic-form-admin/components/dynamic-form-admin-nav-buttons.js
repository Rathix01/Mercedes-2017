import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import SlidePanel from '../../slide-panel'
import SelectList from '../../input-select-list';
import VisibilityContainer from '../../visibility-container';
import { nextPrevBtns, center, nextBtn, prevBtn } from '../styles';

const dynamicFormAdminNavButtons = (state) => {
	return (
			<div className={nextPrevBtns}>
				<div className={center}>
					<button onClick={state.handleEvent} className={prevBtn} id='back'>Back</button>
					<button onClick={state.handleEvent} className={nextBtn} id='next'>Next</button>
					<VisibilityContainer id="SaveInstanceButtonVisibility">
						<button onClick={state.handleEvent} className={nextBtn} id='save-instance'>Save</button>
					</VisibilityContainer>
				</div>
			</div>
	);
}

export default readWrite(dynamicFormAdminNavButtons, "DynamicFormAdminNavButtons");