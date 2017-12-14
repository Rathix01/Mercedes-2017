import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DisplayField from '../../display-field';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import Text from '../../text';
import { row, btnRow, newForm } from '../styles';

const dynamicFormAdminEditPresentation = (state) => {
	return (
		<div>
			<div className={row}>
				<label>Type</label>
				<div> 
					<InputSelectList id="PresentationOptions" isEditField={true} items={[ "line", "3-balls", "diamonds", "balls-and-line", "diamonds-and-line" ]} /> 
				</div>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminEditPresentation, "DynamicFormAdminEditPresentation");