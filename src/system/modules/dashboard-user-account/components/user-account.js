import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DisplayField from '../../display-field';
import { container, altRow } from '../styles'

const userAccount = (state) => {
	return <div className={ container }>
		<div>
			<DisplayField id="Email" label="Email" icon='fa-envelope' value={ state.Email } componentColor={ state.componentColor } />
		</div>
		<div className={altRow}>
			<DisplayField id="Name" label="Name" icon='fa-user' value={ `${state.FirstName} ${state.LastName}` } componentColor={ state.componentColor } />
		</div>
		<div>
			<DisplayField id="CustomerID" label="Customer ID" icon='fa-flag' value={ state.CustomerID } componentColor={ state.componentColor } />
		</div>
		<div className={altRow}>
			<DisplayField id="DateOfBirth" label="Date of Birth" icon='fa-calendar' value={ state.DateOfBirth } componentColor={ state.componentColor } />
		</div>
		<div>
			<DisplayField id="Gender" label="Gender" icon='fa-venus-mars' value={ state.Gender } componentColor={ state.componentColor } />
		</div>
		<div className={altRow}>
			<DisplayField id="MobileNumber" label="Phone" icon='fa-mobile' value={ state.MobileNumber } componentColor={ state.componentColor } />
		</div>
	</div>
}

//<DisplayField id="Address" 		label="Address" icon='fa-home' value={ state.Address } />

export default moduleStatepublisher(userAccount, "UserAccount");