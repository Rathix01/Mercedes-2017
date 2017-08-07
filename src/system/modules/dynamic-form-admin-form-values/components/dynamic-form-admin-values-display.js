import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import List from '../../list';
import Value from './dynamic-form-admin-value';

const dynamicFormAdminValuesDisplay = (state) => {
	return <List id="AdminFormDisplayValues">
		<Value />
	</List>
};

module.exports = readWrite(dynamicFormAdminValuesDisplay, "DynamicFormAdminValuesDisplay");