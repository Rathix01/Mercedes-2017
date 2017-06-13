import Bacon from 'baconjs';
import publish from '../../../stores/state-store';

// colours.
import { colors } from '../../../styles/variables.style.js';

// component references.
import TestComponent from '../components/test-component';
import DashboardUserAccount from '../../dashboard-user-account';
import DashboardTasks from '../../dashboard-tasks';
import DashboardPolicies from '../../dashboard-policies';
import DashboardLockbox from '../../dashboard-lockbox';
import DashboardClaims from '../../dashboard-claims';
import Contact from '../../contact';

Bacon.once({ items: [{
  		key: 'myAccount',
  		title: 'Account',
      itemKey: "DashboardAccount",
      background: colors.green,
  		component: DashboardUserAccount
	},
	{
  		key: 'myTasks',
  		title: 'Tasks',
      background: colors.gray,
  		component: DashboardTasks
	},
	{
  		key: 'policies',
  		title: 'Policies',
      background: colors.blue,
  		component: DashboardPolicies
	},
	{
  		key: 'lockBox',
  		title: 'Lockbox',
      background: colors.terracotta,
  		component: DashboardLockbox
	},
	{
  		key: 'claims',
  		title: 'Claims',
      background: colors.seaGreen,
  		component: DashboardClaims
	},
  {
      key: 'contact',
      title: "Contact Us",
      background: colors.orange,
      component: Contact
  }] 
  
}).delay(1000).onValue(publish("DashboardSections"));