import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DisplayField from '../../display-field';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import { row, btnRow, newForm } from '../styles';

const dynamicFormAdminEditForm = (state) => {
	return (
		<div>
			<br />
			<div className={row}>
				<label>ID</label>
				<div> { `${ state.uniqueId || "" }` } </div>
			</div>
			<div className={row}>
				<label>Component Type</label>
				<div> 
					<InputSelectList id="ComponentTypeSelect" items={ [ "", "header", "question", "text" ] } /> 
				</div>
			</div>
			<div className={row}>
				<label>Input Type</label>
				<div> 
					<InputSelectList id="ComponentInputType" items={ [ "", "text", "select", "radio", "text area" ] } /> 
				</div>
			</div>
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
			<div className={row}>
				<label>Page</label>
				<div> 
					<InputText id="ComponentPage" />  
				</div>
			</div>
			<div className={btnRow}>
				<div onClick={ state.handleEvent } id="save-question" className={newForm}>
					<i className="fa fa-arrow-circle-left"></i> Apply
				</div>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminEditForm, "DynamicFormAdminEditForm");