import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DisplayField from '../../display-field';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import Text from '../../text';
import { row, idRow, btnRow, newForm } from '../styles';

import EditHeader from './dynamic-form-admin-edit-header';
import EditPresentation from './dynamic-form-admin-edit-presentation';

const getHeader = () => <EditHeader id="EditHeader" />;
const getPresentation = () => <EditPresentation id="EditPresentation" />;

const getDefault = () => {
	return (<div>
		<div className={row}>
				<label>Input Type</label>
				<div> 
					<InputSelectList id="ComponentInputType" items={ [ "", 
																	"button",
																	"text", 
																	"select", 
																	"radio", 
																	"text area", 
																	"date", 
																	"checkbox", 
																	"auto-complete",
																	"password-and-confirm" ] } /> 
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
				<label>Options</label>
				<div> 
					<InputText id="ComponentOptions" />  
				</div>
			</div>
			<div className={row}>
				<label>Validation</label>
				<div> 
					<InputText id="ValidationOptions" />  
				</div>
			</div>
		</div>);
}

const getEditComponents = (state) => {
	return {
		'header': getHeader(),
		'presentation': getPresentation(),
		'question': getDefault(),
		'text': getDefault(),
		'list': getDefault(),
	}[ state.componentType ]
}

const dynamicFormAdminEditForm = (state) => {
	return (
		<div>
			<br />
			<div className={idRow}>
				<label>ID</label>
				<div> { `${ state.uniqueId || "" }` } </div>
			</div>
			<div className={row}>
				<label>Component Type</label>
				<div> 
					<InputSelectList id="ComponentTypeSelect" items={ [ "", "header", "question", "text", "presentation", "list" ] } /> 
				</div>
			</div>
			{ getEditComponents(state) }
			<div className={row}>
				<label>Page</label>
				<div> 
					<Text id="ComponentPage" />  
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