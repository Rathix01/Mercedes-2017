import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DynamicFormAdminItemToEdit from '../../dynamic-form-admin-item-to-edit';
import { genericToolsContainer, fixedContainer } from '../styles';

const dynamicFormAdminGenericTools = (state) => {
	return (
		<div className={ genericToolsContainer }>
			<div className={fixedContainer}>
				<h4>Generic Tools</h4>
				<button onClick={ state.handleEvent } id="new-form">New Question</button>
				<button onClick={ state.handleEvent } id="save-form">Save Form</button>
				<DynamicFormAdminItemToEdit id="ItemToEdit" />
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminGenericTools, "DynamicFormAdminGenericTools");


