import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import { Editor } from '../../dynamic-form-admin-rules';


const dynamicFormAdminTools = (state) => {
	return (
		<div>
			<Editor id="DynamicFormAdminRulesEditor" rootId={state.id} />
		</div>
	);
};

export default moduleStatepublisher(dynamicFormAdminTools, "DynamicFormAdminTools");