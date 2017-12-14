import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';
import DynamicFormAdminToolsGeneric from './dynamic-form-admin-tools-generic';
import DynamicFormAdminFormUpdateListener from './dynamic-form-admin-active-form-listener';
import NavButtons from './dynamic-form-admin-tools-nav-buttons';
import { toolsContainer, header, } from '../styles';

const dynamicFormAdminTools = (state) => {
	return (
		<div className={ toolsContainer }>
			<h1 className={header}>Tools</h1>
			<DynamicFormAdminFormUpdateListener id="ActiveFormListener" />
			<DynamicFormAdminFormUpdateListener id="AdminSections" />
			<DynamicFormAdminToolsGeneric id="DynamicFormAdminToolsGeneric" />
			<NavButtons id="AdminFormDisplayValues" />
		</div>
	);
};

export default moduleStatepublisher(dynamicFormAdminTools, "DynamicFormAdminTools");


