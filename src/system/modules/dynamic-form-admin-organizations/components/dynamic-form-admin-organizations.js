import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';
import VisibilityContainer from '../../visibility-container';
import DynamicFormAdminOrgColors from './dynamic-form-admin-organizations-colors';
import DynamicFormAdminOrgFormsList from './dynamic-form-admin-organizations-forms-list';
import Tabs from '../../tabs';
import { adminContainer, orgAndForm, inputArea, pageTitle, tabArea } from '../styles';

const dynamicFormAdminOrganizations = (state) => {
	return <VisibilityContainer id="DynamicFormAdminOrganizationDisplayVisibility" defaultVisibility={true}> 
		<div className={ adminContainer }>
			<div className={orgAndForm}>
				<div className={ inputArea }>
					<div className={pageTitle}>{ state.displayName } Online Forms Management</div>
				</div>
				<div className={ tabArea }>
					<Tabs id='OrgTabs' labels={ ["Forms", "Colours"] }>
						<DynamicFormAdminOrgFormsList id="DynamicFormAdminOrgFormsListSmall" />
						<DynamicFormAdminOrgColors id="DynamicFormAdminOrgColors" />
					</Tabs>
				</div>
				<StateListener id="AdminOrgAndForm" />
			</div>
		</div>
	</VisibilityContainer>
};

module.exports = moduleStatepublisher(dynamicFormAdminOrganizations, "DynamicFormAdminOrganizations");
