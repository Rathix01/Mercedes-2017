import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import CarLarge from '../images/car-large.png';
import AnimationContainer from '../../animation-container';
import FormIntro from './mb-form-intro';
import Dealer from '../../mb-dealer';
import License from '../../mb-license';
import Address from '../../mb-address';
import AboutYou from '../../mb-about-you';
import IncomeDetails from '../../mb-income-details';
import Disclaimer from '../../mb-disclaimer';
import FormNavigation from './mb-form-page-navigation';
import { container, imageContainer, footerContainer, formContainer, footerText, carImg } from '../styles';

const mercedesBenzWebsiteForm = (state) => {
	return (
		<div className={container}>
			<AnimationContainer id="FormCarAnimation" className={imageContainer}>
				<img src={CarLarge} className={carImg} />
			</AnimationContainer>
			<FormNavigation id="FormPageNavigation" />
			<div className={formContainer}>
				<FormIntro id="FormIntro" />
				<Dealer id="Dealer" />
				<License id="License" />
				<Address id="Address" />
				<AboutYou id="AboutYou" />
				<IncomeDetails id="IncomeDetails" />
				<Disclaimer id="Disclaimer" />
			</div>
			<div className={footerContainer}>
				<div className={footerText}>
					<div>* Financed amount include on-road-cost of $1500 and documentation of $235 and PPSR fee of $10.35.</div>
					<div>
						The Monthly Repayment is based on an interest rate of 9.75%. The actual repayment amount may vary based 
						on the outcome of conversations with your Dealer.  
					</div>
				</div>
			</div>
		</div>
	);
};

export default moduleStatepublisher(mercedesBenzWebsiteForm, "MercedesBenzWebsiteForm");