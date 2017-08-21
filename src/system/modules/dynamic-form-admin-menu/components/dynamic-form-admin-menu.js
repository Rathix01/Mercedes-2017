import React from 'react';
import moduleStatepublisher from '../../../components/read-and-write-state';
import { content, menuItem } from '../styles';

const dynamicFormAdminMenu = (state) => {
	return <div className={content}>
		<div id="Form" onClick={state.handleEvent} className={menuItem}>Form</div>
		<div id="Org" onClick={state.handleEvent} className={menuItem}>Organizations</div>
	</div>
};

module.exports = moduleStatepublisher(dynamicFormAdminMenu, "DynamicFormAdminMenu");