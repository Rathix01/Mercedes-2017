import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DisplayField from '../../display-field';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import { row, btnRow } from '../styles';

const dynamicFormAdminEditForm = (state) => {
	return (
		<div>
			<br />
			<div className={row}>
				<label>ID</label>
				<div> { `${state.sectionId || ""}-${ state.uniqueID || "" }` } </div>
			</div>
			<div className={row}>
				<label>Component Type</label>
				<div> 
					<InputSelectList id="ComponentTypeSelect" items={ [ "header", "question", "text" ] } /> 
				</div>
			</div>
			<div className={row}>
				<label>Title</label>
				<div> 
					<InputText id="ComponentTitle" items={ [ "header", "question", "text" ] } /> 
				</div>
			</div>
			<div className={row}>
				<label>Text</label>
				<div> 
					<InputText id="ComponentText" items={ [ "header", "question", "text" ] } /> 
				</div>
			</div>
			<div className={row}>
				<label>Input</label>
				<div> 
					<InputSelectList id="ComponentInputSelect" items={ [ "text", "select" ] } /> 
				</div>
			</div>
			<div className={row}>
				<label>Options</label>
				<div> 
					<InputSelectList id="ComponentInputOptions" items={ [ "a", "b", "c" ] } /> 
				</div>
			</div>
			<div className={btnRow}>
				<button onClick={ state.handleEvent } id="save-question">Save</button>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminEditForm, "DynamicFormAdminEditForm");