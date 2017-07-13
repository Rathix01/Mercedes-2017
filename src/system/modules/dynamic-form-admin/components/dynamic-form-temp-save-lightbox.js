import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DisplayField from '../../display-field';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import { saveForm, saveFormHeader, saveFormBody } from '../styles';

const dynamicFormAdminLightboxSaveForm = (state) => {
	return (
		<div className={ saveForm }>
			<br />
			<div className={saveFormHeader}>
				<label>Name your form</label>
			</div>
			<div className={saveFormBody}> 
				<InputText id="ComponentText" items={ [ "header", "question", "text" ] } /> 
			</div>
			<div>
				<button onClick={ state.handleEvent } id="save-question">Save</button>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminLightboxSaveForm, "dynamicFormAdminLightboxSaveForm");