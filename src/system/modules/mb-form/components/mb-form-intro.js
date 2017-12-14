import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import CarLarge from '../images/car-large.png';
import AnimationContainer from '../../animation-container';
import VisibilityContainer from '../../visibility-container';
import InputText from '../../input-text';
import InputButton from '../../input-button';
import InputSelect from '../../input-select-list';
import { applyButton, intro1, greatChoice, letsStart, beforeYouApply, closeButton, outro, smallPrint,
	fiveMins, licence, letsStartInputs, input, longInput, letsStartButton, finishAndClose } from '../styles';

const mercedesBenzWebsiteFormIntro = (state) => {
	return (
		<div>
			<AnimationContainer id="FormIntro1Animation" className={ intro1 }>
				<div className={greatChoice}>Great Choice</div>
				<div>
					We have a range of finance options available, use the calculator to configure
					the best payments for you.
				</div>
				<div>
					<div className={applyButton} onClick={state.handleEvent} id="apply">Apply for pre-approved finance</div>
				</div>
			</AnimationContainer>
			<VisibilityContainer id="FormIntro2Visibility">
				<AnimationContainer id="FormIntro2Animation" className={letsStart}>
					<div>
						<div className={beforeYouApply}>Before you apply:</div>
						<div className={fiveMins}>The application is a four step process and should take around 5 minutes</div>
						<div className={licence}>You will need your driver licence handy</div>
						<div>
							You have to be 18 or over, with a NZ residency or Work Visa that covers at least the length
							of the finance term. We also need your email address for verification purposes.
						</div>
						<div className={letsStartInputs}>
							<div>
								<InputSelect 
									id="ValidCustomer"
									className={input}
									items={["18+ NZ Citizen",
											 "18+ NZ Resident",
											 "18+ Work Visa",
											 "None of these"]} />
							</div>
							<div>
								<InputText id="EmailAddress" placeholder="Email Address" className={longInput} />
							</div>
						</div>
						<div>
							<div className={letsStartButton} onClick={state.handleEvent} id="start">Lets start</div>
						</div>
					</div>
				</AnimationContainer>
			</VisibilityContainer>
			<VisibilityContainer id="FormCompleteVisibility" className={outro}>
				<div className={greatChoice}>Great we're done!</div>
				<div>
					Your application has been approved
				</div>
				<div>
					The Auckland dealership will be in touch soon.
				</div>
				<div className={smallPrint}>
					We have also sent an email to: Email Address
				</div>
				<InputButton id="CloseForm" className={finishAndClose}>Finish and close</InputButton>
			</VisibilityContainer>
		</div>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormIntro, "MercedesBenzWebsiteFormIntro");



