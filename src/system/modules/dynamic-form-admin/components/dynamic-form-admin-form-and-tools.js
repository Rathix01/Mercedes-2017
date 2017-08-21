import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import PositionAwareList from '../../position-aware-list';
import DynamicFormAdminTools from '../../dynamic-form-admin-tools';
import DynamicFormAdminSection from './dynamic-form-admin-section';
import VisibilityContainer from '../../visibility-container';
import { adminContainer, formColumn, toolsColumn } from '../styles';

const dynamicFormAdminFormAndTools = (state) => {
	return (
		<VisibilityContainer id="FormAndToolsVisibility" defaultVisibility={true}>
			<div className={ adminContainer }>
				<div className={ formColumn }>
		        	<PositionAwareList id="AdminSections" isRoot={true}>
						<DynamicFormAdminSection />
					</PositionAwareList>
				</div>
				<VisibilityContainer id="ToolsColumnVisibility" className={ toolsColumn } defaultVisibility={true}>
					<DynamicFormAdminTools id="DynamicFormAdminTools" />
				</VisibilityContainer>
			</div>
		</VisibilityContainer>
	);
};

export default moduleStatepublisher(dynamicFormAdminFormAndTools, "DynamicFormAdminFormAndTools");