import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import DynamicFormAdminItemToEdit from '../../dynamic-form-admin-item-to-edit';
import DynamicFormAdminOrgAndFormTools from './dynamic-form-admin-org-and-form-tools';
import DynamicFormAdminFormValues from '../../dynamic-form-admin-form-values';
import { genericToolsContainer, fixedContainer } from '../styles';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import Tabs from '../../tabs';
import { inputArea, createForm, orgAndForm, newForm, btnArea, positiveNotification, saving } from '../styles';

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
						<i className="fa fa-plus-circle"></i> New Page
					</div>
					<div onClick={ state.handleEvent } id="new-question" className={newForm}>
						<i className="fa fa-plus-circle"></i> New Item
					</div>
					<div onClick={ state.handleEvent } id="save-form" className={newForm}>
						<i className="fa fa-arrow-circle-up"></i> Save Form
					</div>
					<VisibilityContainer id="SavingNotificationVisibility" defaultVisibility={false}>
						<AnimationContainer id="SavingNotificationAnimation">
							<div className={saving}>
								<i className="fa fa-arrow-circle-up"></i> Saving
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
				</div>
			</div>
		</div>
	);
};

export default readWrite(dynamicFormAdminGenericTools, "DynamicFormAdminGenericTools");
