import React from 'react';
import readWrite from '../../../components/read-and-write-state';

import InputField from '../../input-field';
import InputText from '../../input-text';
//import Styles from '../styles';

export default readWrite((state) => {
	return <div> 
		<h1>Login</h1>
		<InputField id='LoginUsername' label="Email" required={true}>
			<InputText />
		</InputField>
		<InputField id='LoginPassword' rootId={ state.id } label="Password" required={true}>
			<InputText type='password' />
		</InputField>
		<button onClick={state.handleEvent}>Login</button>
	</div>
});