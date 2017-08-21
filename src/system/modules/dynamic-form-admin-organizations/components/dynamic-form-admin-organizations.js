import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';
import VisibilityContainer from '../../visibility-container';
import DynamicFormAdminOrgColors from './dynamic-form-admin-organizations-colors';
import { adminContainer, orgAndForm, inputArea, inputAreaSection } from '../styles';

const dynamicFormAdminOrganizations = (state) => {
	return <VisibilityContainer id="DynamicFormAdminOrganizationDisplayVisibility"> 
		<div className={ adminContainer }>
			<div className={orgAndForm}>
				<div className={ inputArea }>
					<div className={inputAreaSection}>Organization</div>
					<div className={inputAreaSection}>{ state.displayName }</div>
				</div>
				<DynamicFormAdminOrgColors id="DynamicFormAdminOrgColors" />
				<StateListener id="AdminOrgAndForm" />
			</div>
		</div>
	</VisibilityContainer>
};

module.exports = moduleStatepublisher(dynamicFormAdminOrganizations, "DynamicFormAdminOrganizations");