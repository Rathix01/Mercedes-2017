import React from 'react';
import read from '../../../components/read-state';
import Styles from '../styles'

import PageSection from '../../page-section';
import RegistrationForm from '../../registration-form';
import List from '../../list'

const TravelSignUp = (state) => <div> 
	<PageSection>
		<List id='RegistrationForms'>
			<RegistrationForm />
		</List>
	</PageSection> 
</div>;

export default read(TravelSignUp);
