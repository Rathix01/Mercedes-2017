import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import StateListener from '../../../components/state-listener';
import VisibilityContainer from '../../visibility-container';
import List from '../../list';

const dynamicFormAdminInstanceList = (state) => {
	return (
		<VisibilityContainer id="InstanceListVisibility">
			
		</VisibilityContainer>
	);
}

export default readWrite(dynamicFormAdminInstanceList, "dynamicFormAdminInstanceList");