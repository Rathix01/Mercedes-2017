import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import SlidePanel from '../../slide-panel'
import SelectList from '../../input-select-list';
import { title, content, cell, closeBtn } from '../styles/data-controls-styles';

const dynamicFormDataControls = (state) => {
	return (
		<SlidePanel id="DataControls">
			<div className={ title }>
				Development Data Controls
				<a href="#" id='closeButton' onClick={ state.handleEvent } className={ closeBtn }>close</a>
			</div>
			<div className={ content }>
				<div className={ cell }>
					<SelectList id="DataFormName" items={ [{ text: "form 1", value: "form1" },{ text: "form 2", value: "form2" }] }></SelectList>
					<button onClick={ state.handleEvent }>Load</button>
				</div>
				<div className={ cell }>
					<button onClick={ state.handleEvent }>Next</button>
					<button onClick={ state.handleEvent }>Back</button>
				</div>
			</div>
		</SlidePanel>
	);
}

export default readWrite(dynamicFormDataControls, "DynamicFormDataControls");