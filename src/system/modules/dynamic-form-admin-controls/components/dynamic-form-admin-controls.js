import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import BasicControls from './dynamic-form-admin-basic-controls';
import VisibilityContainer from '../../visibility-container';

const dynamicFormAdminControls = (state) => {
	return (
		<VisibilityContainer id="BasicControlsVisibility" defaultVisibility={true}>
			<BasicControls id={  `${ state.id }Basic` } rootId={ state.rootId } stateKey={state.uniqueId} />
		</VisibilityContainer>
	);
};

export default moduleStatepublisher(dynamicFormAdminControls, "DynamicFormAdminControls");


