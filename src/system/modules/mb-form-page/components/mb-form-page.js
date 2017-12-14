import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import Listener from '../../../components/state-listener';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import FormCalculator from './mb-form-calculator';
import Form from '../../mb-form';
import X from '../images/x.png';
import { container, formContainer, innerContainer, rightColumn, closeButton } from '../styles';

const mercedesBenzWebsiteFormPage = (state) => {
	return (
		<VisibilityContainer id="FormPageVisibility">
			<AnimationContainer id="FormPageAnimation" className={container}>
				<div className={innerContainer}>
					<FormCalculator id="FormCalculator" />
					<div className={rightColumn}>
						<AnimationContainer id="FinanceFormAnimation" className={formContainer}>
							<Form id="FinanceForm" />
						</AnimationContainer>
						<div className={closeButton} onClick={state.handleEvent}>
							<img src={ X } />
						</div>
					</div>
				</div>
			</AnimationContainer>
			<Listener id="SelectedCar" />
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPage, "MercedesBenzWebsiteFormPage");