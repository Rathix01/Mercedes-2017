import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DynamicFormAdminItemToEdit from '../../dynamic-form-admin-item-to-edit';
import DynamicFormAdminOrgAndFormTools from './dynamic-form-admin-org-and-form-tools';
import DynamicFormAdminFormValues from '../../dynamic-form-admin-form-values';
import { genericToolsContainer, fixedContainer } from '../styles';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import Tabs from '../../tabs';
import { inputArea, createForm, orgAndForm, newForm, icon, btnArea, positiveNotification, saving } from '../styles';

const dynamicFormAdminGenericTools = (state) => {
	return (
		<div className={genericToolsContainer}>
			<div className={fixedContainer}>
				<Tabs id='ToolTabs' labels={ ["Main", "Edit", "Values"] }>
					<DynamicFormAdminOrgAndFormTools id="DynamicFormAdminOrgAndFormTools" />
					<VisibilityContainer id="ItemToEditVisibility">
						<DynamicFormAdminItemToEdit id="ItemToEdit" />	
					</VisibilityContainer>
					<DynamicFormAdminFormValues id="DynamicFormAdminFormValues" />
				</Tabs>
				
				<div className={ btnArea }>
					<div onClick={ state.handleEvent } id="new-page" className={newForm}>
						<i className={ `${icon} fa fa-plus-circle` }></i> Page
					</div>
					<div onClick={ state.handleEvent } id="new-question" className={newForm}>
						<i className={ `${icon} fa fa-plus-circle` }></i> Item
					</div>
					<div onClick={ state.handleEvent } id="save-form" className={newForm}>
						<i className={ `${icon} fa fa-cloud-upload` }></i> Save
					</div>
				</div>
				<VisibilityContainer id="SavingNotificationVisibility" defaultVisibility={false}>
					<AnimationContainer id="SavingNotificationAnimation">
						<div className={saving}>
							<i className="fa fa-arrow-circle-up"></i> Saving
						</div>
					</AnimationContainer>
				</VisibilityContainer>
				<VisibilityContainer id="DeletingNotificationVisibility" defaultVisibility={false}>
					<AnimationContainer id="DeletingNotificationAnimation">
						<div className={saving}>
							<i className="fa fa-arrow-circle-up"></i> Deleting
						</div>
					</AnimationContainer>
				</VisibilityContainer>
				<VisibilityContainer id="SavedNotificationVisibility" defaultVisibility={false}>
					<AnimationContainer id="SavedNotificationAnimation">
						<div className={positiveNotification}>
							<i className="fa fa-check-circle"></i> Save Successful
						</div>
					</AnimationContainer>
				</VisibilityContainer>
				<VisibilityContainer id="DeletedNotificationVisibility" defaultVisibility={false}>
					<AnimationContainer id="DeletedNotificationAnimation">
						<div className={positiveNotification}>
							<i className="fa fa-check-circle"></i> Delete Successful
						</div>
					</AnimationContainer>
				</VisibilityContainer>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminGenericTools, "DynamicFormAdminGenericTools");
