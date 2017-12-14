import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import Logo from '../images/logo-image.png';
import LoadingBar from './mb-loading-bar';
import { container, logoContainer } from '../styles';

const mercedesBenzWebsiteLoadingBar = (state) => {
	return (
		<VisibilityContainer id="LoadingBarAndIconVisibility" defaultVisibility={true}>
			<AnimationContainer id="LoadingBarAndIconAnimation" className={container}>
				<div className={logoContainer}>
					<img src={ Logo } />
				</div>
				<LoadingBar id="MainLoadingBar" />
			</AnimationContainer>
		</VisibilityContainer>
	);
};

export default moduleStatepublisher(mercedesBenzWebsiteLoadingBar, "MercedesBenzWebsiteLoadingBar");