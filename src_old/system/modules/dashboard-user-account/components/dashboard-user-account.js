import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import UserAccount from './user-account';
import { headerText } from '../styles';

const dashboardUserAccount = (state) => {
	return <div>
		<UserAccount id="UserAccount" componentColor={state.componentColor} />
	</div>
}

export default moduleStatepublisher(dashboardUserAccount, "DashboardUserAccount");