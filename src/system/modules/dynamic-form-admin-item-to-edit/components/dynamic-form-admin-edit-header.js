import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DisplayField from '../../display-field';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import Text from '../../text';
import { row, btnRow, newForm } from '../styles';

const dynamicFormAdminEditHeader = (state) => {
	return (
		<div>
			<div className={row}>
				<label>Title</label>
				<div> 
					<InputText id="ComponentTitle" /> 
				</div>
			</div>
			<div className={row}>
				<label>Text</label>
				<div> 
					<InputText id="ComponentText" /> 
				</div>
			</div>
			<div className={row} style={{ display: "none" }}>
				<label>Left Hand Logo</label>
				<div> 
					<InputText id="ComponentOptions" />  
				</div>
			</div>
			<div className={row} style={{ display: "none" }}>
				<label>Right Hand Logo</label>
				<div> 
					<InputText id="ValidationOptions" />  
				</div>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminEditHeader, "DynamicFormAdminEditHeader");