import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';

const dynamicFormAdminRulesListener = (state) => <div>
		<StateListener id="RulesListener" />
		<StateListener id="ValidationListener" />
		<StateListener id="ValidatedValues" />
	</div>;

export default moduleStatepublisher(dynamicFormAdminRulesListener, "DynamicFormAdminRulesListener");