import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import DynamicFormAdminInstanceFeedback from './dynamic-form-admin-instance-feedback';
import { nextPrevBtns, center, nextBtn, prevBtn, pageNumber } from '../styles';

const dynamicFormAdminNavButtons = (state) => {
	console.log(state);
	return (
			<div className={nextPrevBtns}>
				<div className={center}>
					<div className={pageNumber}>{state.page || 1}</div>
					<VisibilityContainer id="BackButtonVisibility" defaultVisibility={true}>
						<button onClick={state.handleEvent} className={prevBtn} id='back'>Back</button>
					</VisibilityContainer>
					<button onClick={state.handleEvent} className={nextBtn} id='next'>Next</button>
					<VisibilityContainer id="SaveInstanceButtonVisibility">
						<button onClick={state.handleEvent} className={nextBtn} id='save-instance'>Save</button>
					</VisibilityContainer>
					<DynamicFormAdminInstanceFeedback id="DynamicFormAdminInstanceFeedback" />
				</div>
			</div>
	);
}

export default readWrite(dynamicFormAdminNavButtons, "DynamicFormAdminNavButtons");