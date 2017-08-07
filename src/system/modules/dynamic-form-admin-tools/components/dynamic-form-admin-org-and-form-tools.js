import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DynamicFormAdminItemToEdit from '../../dynamic-form-admin-item-to-edit';
import { genericToolsContainer, fixedContainer } from '../styles';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import VisibilityContainer from '../../visibility-container';
import { inputArea, createForm, orgAndForm, newForm } from '../styles';

const dynamicFormAdminOrgAndFormTools = (state) => {
	return (
		<div className={orgAndForm}>
			<div className={inputArea}>
				<label>Organization</label>
				<InputSelectList id="OrgSelect" />
			</div>
			<VisibilityContainer id="OrgAndFormVisibility" defaultVisibility={true}>
				<div className={inputArea}>
					<label>Select a Form</label>
					<InputSelectList id="OrgFormsSelect" />
				</div>
				<div className={inputArea}>
					<div onClick={ state.handleEvent } id="new-form" className={newForm}>
						<i className="fa fa-plus"></i> New Form
					</div>
				</div>
			</VisibilityContainer>
			<VisibilityContainer id="NewFormVisibility">
				<div className={inputArea}>
					<label>New Form</label>
					<InputText id="NewFormName" />	
				</div>
				<div className={inputArea}>
					<div onClick={ state.handleEvent } id="new-form-save" className={createForm}>
						<i className="fa fa-plus"></i> Create Form
					</div>
				</div>
			</VisibilityContainer>
		</div>
	);
};

export default readWrite(dynamicFormAdminOrgAndFormTools, "DynamicFormAdminOrgAndFormTools");
