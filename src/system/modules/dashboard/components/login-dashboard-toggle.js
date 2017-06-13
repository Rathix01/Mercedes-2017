import React from 'react';
import VisibilityContainer from '../../visibility-container';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DashboardMain from './dashboard-main';

const loginDashboardToggle = (state) => {
	return <div>
		<VisibilityContainer id="LoginVisibility">
			<h1>Not Logged In.</h1>
			<a href='https://volo.nz/login'>Login Here</a>
		</VisibilityContainer>
		<VisibilityContainer id="DashboardVisibility">
			<DashboardMain id="DashboardMain" />
		</VisibilityContainer>
	</div>
}

export default moduleStatepublisher(loginDashboardToggle, "LoginDashboardToggle");