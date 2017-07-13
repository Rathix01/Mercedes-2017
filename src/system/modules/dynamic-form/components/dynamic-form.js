import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DataControls from './dynamic-form-data-controls';
import SectionList from './dynamic-form-section-list';
import NavButtons from './dynamic-form-nav-buttons';
import { mainFormContainer } from '../styles';

const dynamicForm = (state) => {
	console.log('form')
	return (
		<div className={ mainFormContainer }>
			<SectionList id="DynamicForm" section={ state.children || null } />
			<NavButtons id="DynamicFormNavBtns" />
			<DataControls />
		</div>
	);
};

export default moduleStatepublisher(dynamicForm, "DynamicForm");