import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import PositionAwareList from '../../position-aware-list';
import DynamicFormAdminTools from '../../dynamic-form-admin-tools';
import DynamicFormAdminSection from './dynamic-form-admin-section';
import DynamicFormAdminSingleItemUpdateListener from './dynamic-form-admin-single-item-update-listener';
import DynamicFormTempSave from './dynamic-form-temp-save-lightbox'
import Lightbox from '../../lightbox';
import { adminContainer, formColumn, toolsColumn, adminHeader } from '../styles';

const dynamicFormAdmin = (state) => {
	return (
		<div>
			<div className={ adminHeader }>
				<h1>Admin</h1>
			</div>
			<div className={ adminContainer }>
				<div className={ formColumn }>
		        	<PositionAwareList id="AdminSections" isRoot={true}>
						<DynamicFormAdminSection />
					</PositionAwareList>
				</div>
				<div className={ toolsColumn }>
					<DynamicFormAdminTools id="DynamicFormAdminTools" />
				</div>
			</div>
			<DynamicFormAdminSingleItemUpdateListener id="DynamicFormAdminSingleItemUpdateListener" />
			<Lightbox id="SaveForm">
				<DynamicFormTempSave />
			</Lightbox>
		</div>
	);
};

export default moduleStatepublisher(dynamicFormAdmin, "DynamicFormAdmin");


