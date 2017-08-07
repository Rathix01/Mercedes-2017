import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DynamicFormAdminValuesDisplay from './dynamic-form-admin-values-display';
import DynamicFormAdminNextFormListener from './dynamic-form-admin-next-form-listener';

const dynamicFormAdminValues = (state) => {
	return (<div>
			<DynamicFormAdminValuesDisplay id="DynamicFormAdminValuesDisplay" />
			<DynamicFormAdminNextFormListener id="NextFormListener" />
		</div>
	);
};

module.exports = moduleStatepublisher(dynamicFormAdminValues, "DynamicFormAdminValues");