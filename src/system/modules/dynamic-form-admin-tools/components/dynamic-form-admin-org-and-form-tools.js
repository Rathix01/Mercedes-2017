import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import { genericToolsContainer, fixedContainer } from '../styles';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import VisibilityContainer from '../../visibility-container';
import Text from '../../text';
import { inputArea, createForm, orgAndForm, newForm, icon } from '../styles';

const dynamicFormAdminOrgAndFormTools = (state) => {
	return (
		<div className={orgAndForm}>
			<VisibilityContainer id="OrgSelectVisibility" defaultVisibility={true}>
				<div className={inputArea}>
					<label>Organization</label>
					<InputSelectList id="OrgSelect" />
				</div>
			</VisibilityContainer>
			<VisibilityContainer id="OrgAndFormsSelectionValues">
				<div className={inputArea}>
					<Text id="OrgSelectionValue" />
				</div>
				<div className={inputArea}>
					<Text id="FormSelectionValue" />
				</div>
			</VisibilityContainer>
			<div className={inputArea}>
			<VisibilityContainer id="OrgAndFormVisibility" defaultVisibility={true}>
				<div>
					<InputSelectList id="OrgFormsSelect" />
				</div>
				<div onClick={ state.handleEvent } id="new-form" className={newForm}>
					<i className={ `${icon} fa fa-plus` }></i> New Form
				</div>
				<div onClick={ state.handleEvent } id="delete-form" className={newForm}>
					<i className={ `${icon} fa fa-trash` }></i> Delete Form
				</div>
				
			</VisibilityContainer>
				<div onClick={ state.handleEvent } id="publish-form" className={newForm}>
					<i className={ `${icon} fa fa-arrow-circle-right` }></i> Publish Form
				</div>
			</div>
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
