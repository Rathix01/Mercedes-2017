import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import CarLarge from '../images/car-large.png';
import AnimationContainer from '../../animation-container';
import VisibilityContainer from '../../visibility-container';
import { navigation, navigationItem } from '../styles';

const mercedesBenzWebsiteFormNavigation = (state) => {
	return (
		<VisibilityContainer id="FormPageNavigationVisibility">
			<AnimationContainer id="FormPageNavigationAnimation" className={navigation}>
				<div className={navigationItem}>1</div>
				<div className={navigationItem}>2</div>
				<div className={navigationItem}>3</div>
				<div className={navigationItem}>4</div>
				<div className={navigationItem}>5</div>
			</AnimationContainer>
			<div></div>
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormNavigation, "MercedesBenzWebsiteFormNavigation");