import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import { basicControls } from '../styles';

const dynamicFormAdminBasicControls = (state) => {
	return (
		<div className={ basicControls }>
			<button onClick={ state.handleEvent } id='basic-edit'>Edit</button>
		</div>
	);
};

export default readWrite(dynamicFormAdminBasicControls, "DynamicFormAdminBasicControls");
