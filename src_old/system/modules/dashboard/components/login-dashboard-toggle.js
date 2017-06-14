import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import VisibilityContainer from '../../visibility-container';
import Login from '../../login';
import DashboardMain from './dashboard-main';


const loginDashboardToggle = (state) => {
	return <div>
		<VisibilityContainer id="LoginVisibility">
			<Login id="Login" />
		</VisibilityContainer>
		<VisibilityContainer id="DashboardVisibility">
			<DashboardMain id="DashboardMain" />
		</VisibilityContainer>
	</div>
}

export default moduleStatepublisher(loginDashboardToggle, "LoginDashboardToggle");