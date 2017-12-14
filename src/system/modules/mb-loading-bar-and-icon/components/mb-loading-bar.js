import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import Logo from '../images/logo-image.png';
import { staticBar, progressBar } from '../styles';

const loadingBar = (state) => {
	return (
		<div className={staticBar}>
			<AnimationContainer id="LoadingBarAnimation" className={progressBar}>_</AnimationContainer>
		</div>
	);
};

export default moduleStatepublisher(loadingBar, "LoadingBar");