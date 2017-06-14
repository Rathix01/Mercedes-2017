import React from 'react';
import read from '../../../components/read-state';
import Sections from './sections';
import PageBar from '../../page-bar';
import Styles from '../styles';

const componentDisplay = (state) => <div> 
	<div className={ Styles.header }>
		<h1> Mosaic Components </h1>
		<PageBar id="ComponentDisplayPageBar" pageFor='DemoComponents' pageSize={4} />
	</div>
	<Sections id="ComponentDisplaySections" isRoot={true} />
</div>


export default read(componentDisplay);