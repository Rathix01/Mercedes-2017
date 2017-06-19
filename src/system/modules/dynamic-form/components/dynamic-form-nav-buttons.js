import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import SlidePanel from '../../slide-panel'
import SelectList from '../../input-select-list';
import { nextPrevBtns, center, nextBtn, prevBtn } from '../styles';

const dynamicFormNavButtons = (state) => {
	return (
			<div className={nextPrevBtns}>
				<div className={center}>
					<button onClick={state.handleEvent} className={prevBtn}>Back</button>
					<button onClick={state.handleEvent} className={nextBtn}>Next</button>
				</div>
			</div>
	);
}

export default readWrite(dynamicFormNavButtons, "DynamicFormNavButtons");