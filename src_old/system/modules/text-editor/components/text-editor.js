import React from 'react';
import read from '../../../components/read-state';
import Styles from '../styles';

const componentDisplay = (state) => <div> 
	<div className={ Styles.header }>
		<h1> Edit Text </h1>
	</div>
	<div>
		
	</div>
</div>


export default read(componentDisplay);