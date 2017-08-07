import React from 'react';
import readWrite from '../../../components/read-and-write-state';

const dynamicFormAdminValue = (state) => {
	return (<div>
				<div>{ state.label }</div>
				<div>{ state.value }</div>
			</div>);
};

module.exports = readWrite(dynamicFormAdminValue, "DynamicFormAdminValue");