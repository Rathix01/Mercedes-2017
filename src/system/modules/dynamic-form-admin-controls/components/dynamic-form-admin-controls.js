import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import BasicControls from './dynamic-form-admin-basic-controls';

const dynamicFormAdminControls = (state) => {
	return (
		<div>
			<BasicControls id={  `${ state.id }Basic` } rootId={ state.rootId } stateKey={state.uniqueId} />
		</div>
	);
};

export default moduleStatepublisher(dynamicFormAdminControls, "DynamicFormAdminControls");


