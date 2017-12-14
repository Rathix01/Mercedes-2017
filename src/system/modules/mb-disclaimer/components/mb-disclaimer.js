import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import InputText from '../../input-text';
import InputButton from '../../input-button';
import InputCheckbox from '../../input-checkbox';
import { container, title, employmentColumn1, employmentColumn2, incomeRow, term, acceptTermsRow, title2,
		emailInput, incomeInput, dependantsInput, employmentArea, employmentInput, nextButton, calcButton, theSmallPrint } from '../styles';

const mercedesBenzWebsiteFormPageDisclaimer = (state) => {
	return (
		<VisibilityContainer id="FormPageDisclaimerVisibility" className={container}>
			<AnimationContainer id="FormPageDisclaimerAnimation">
				<div className={title}>Please Confirm how we should contact you?</div>
				<div className={incomeRow}>
					<div>
						<InputText id="MonthlyIncome" placeholder="Land Line" className={ incomeInput } />
					</div>
					<div>
						<InputText id="MonthlyIncome" placeholder="Mobile" className={ incomeInput } />
					</div>
				</div>
				<div className={incomeRow}>
					<InputText id="EmailAddressConfirm" placeholder="Email Address"  className={ emailInput } />
				</div>
				<div className={title2}>
					Please read our Disclaimer/Privacy Statement
				</div>
				<div className={employmentArea}>
					<div className={theSmallPrint}>
						<div className={term}>By submitting this application for finance I acknowledge and agree to the following:</div>
						<div className={term}>1. The information I have provided in this finance application is true and correct</div>
						<div className={term}>2. I have read and agree to the <a href="#">Privacy Consent</a></div>
						<div className={term}>3. Mercedes-Benz Financial Services New Zealand Limited (MBFSNZ) may contact any person or entity referred in my application or within my credit report to verify any of the information that I have provided to MBFSNZ.</div>
						<div className={term}>4. I have reviewd the proposed loan details above and confirm that they are consistent with my requirements and objectives</div>
						<div className={term}>For more information on now MBFSNZ collects, uses and protects your persona information, please refer to our <a href="#">Privacy Statement</a></div>
					</div>
				</div>
				<div className={acceptTermsRow}>
					<div>
						<InputCheckbox id="AcceptTerms" />
						<div>I accept the terms and conditions</div>
					</div>
					<InputButton id="DiclaimerConfirmButton" text="Confirm" className={nextButton} />
				</div>
			</AnimationContainer>
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageDisclaimer, "MercedesBenzWebsiteFormPageDisclaimer");