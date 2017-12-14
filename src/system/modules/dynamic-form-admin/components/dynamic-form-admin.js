import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';
import DynamicFormAdminMenu from '../../dynamic-form-admin-menu';
import DynamicFormAdminOrgs from '../../dynamic-form-admin-organizations';
import DynamicFormAdminSingleItemUpdateListener from './dynamic-form-admin-single-item-update-listener';
import DynamicFormAdminUpdateListener from './dynamic-form-admin-update-listener'
import DynamicFormAdminFormValuesListener from './dynamic-form-admin-form-values-update-listener';
import DynamicFormAdminRules from '../../dynamic-form-admin-rules';
import VisibilityContainer from '../../visibility-container';
import DynamicFormAdminFormAndTools from './dynamic-form-admin-form-and-tools';

import { adminHeader } from '../styles';

const dynamicFormAdmin = (state) => {
	return (
		<div>
			<VisibilityContainer id="AdminHeaderVisibility" defaultVisibility={true}>
				<div className={ adminHeader }>
					<h1>Admin</h1>
					<DynamicFormAdminMenu id="DynamicFormAdminMenu" />
				</div>
			</VisibilityContainer>
			<DynamicFormAdminFormAndTools id="DynamicFormAdminFormAndTools" />
			<DynamicFormAdminOrgs id="DynamicFormAdminOrgDetails" />
			<DynamicFormAdminSingleItemUpdateListener id="DynamicFormAdminSingleItemUpdateListener" />
			<DynamicFormAdminUpdateListener id="AdminOrgAndForm" />
			<DynamicFormAdminFormValuesListener id="AdminOrgAndForm" />
			<DynamicFormAdminRules id="AdminRules" />
			
			<StateListener id="ForceFormRender" />
			<StateListener id="FormMode" />
			<StateListener id="SaveWithRules" />
		</div>
	);
};

export default moduleStatepublisher(dynamicFormAdmin, "DynamicFormAdmin");


