import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import LoginToggle from './login-dashboard-toggle';

const dashboard = (state) => {
	return <div>
		<LoginToggle id="LoginToggle" />
	</div>
}

export default moduleStatepublisher(dashboard, "Dashboard");