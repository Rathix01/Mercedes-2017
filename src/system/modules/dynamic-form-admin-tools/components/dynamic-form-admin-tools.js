import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DynamicFormAdminToolsGeneric from './dynamic-form-admin-tools-generic';
import DynamicFormAdminFormUpdateListener from './dynamic-form-admin-active-form-listener';
import { toolsContainer, header, } from '../styles';


const dynamicFormAdminTools = (state) => {
	return (
		<div className={ toolsContainer }>
			<h1 className={header}>Tools</h1>
			<DynamicFormAdminFormUpdateListener id="AdminSections" />
			<DynamicFormAdminToolsGeneric id="DynamicFormAdminToolsGeneric" />
		</div>
	);
};

export default moduleStatepublisher(dynamicFormAdminTools, "DynamicFormAdminTools");


