import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import VisibilityContainer from '../../visibility-container';
import AnimationContainer from '../../animation-container';
import LogoWithText from '../images/logo-and-text.png';
import InputButton from '../../input-button';
import Text from '../../text';
import InputSelect from '../../input-select-list';
import { leftColumn, carName, labelAndValue, total, sliders, slider, termSelect, termOption, amountDisplay, mobileApplyButton } from '../styles';

const mercedesBenzWebsiteFormCalculator = (state) => {
	return (
			<AnimationContainer id="FormCalculatorAnimation" className={leftColumn}>
				<div>
					<img src={LogoWithText} />
				</div>
				<div className={carName}>{state.name}</div>
				<div className={labelAndValue}>
					<div>RRP</div><div>${state.rrp}</div>
				</div>
				<div className={labelAndValue}>
					<div>ORC</div><div>$1,500.00</div>
				</div>
				<div className={labelAndValue}>
					<div>DOC + PPSR</div><div>$245.45</div>
				</div>
				<div className={total}>
					<div>Total inc GST</div><div>${ state.total }</div>
				</div>
				<div className={sliders}>
					<div>
						<div className={labelAndValue}>
							<div className={amountDisplay}>$<Text id="WeeklyAmount" /></div>
							<div>per week</div>
						</div>
						<div>
	  						<input type="range" min="100" max="1000" defaultValue="500" className={`${slider} slider`} />
						</div>
					</div>
					<div>
						<div className={labelAndValue}>
							<div className={amountDisplay}>$<Text id="DepositAmount" /></div>
							<div>deposit</div>
						</div>
						<div>
	  						<input type="range" min="100" max="1000" defaultValue="500" className={`${slider} slider`} />
						</div>
					</div>
					<div style={{ display: "none" }}>
						<div className={labelAndValue}>
							<div className={amountDisplay}>$<Text id="FinalPaymentAmount" /></div>
							<div>final payment</div>
						</div>
						<div>
	  						<input type="range" min="100" max="1000" defaultValue="500" className={`${slider} slider`} />
						</div>
					</div>
				</div>
				<div className={labelAndValue}>
					<div>Reset</div>
					<div><InputSelect id="TermSelect" items={[
						"12 Month Term", "24 Month Term", "36 Month Term", "48 Month Term", "60 Months"
						]} className={termSelect} optionClass={termOption} /></div>
				</div>
				<InputButton className={mobileApplyButton} id="MobileApply">Apply for pre-approved finance</InputButton>
			</AnimationContainer>
		);
};

export default moduleStatepublisher(mercedesBenzWebsiteFormCalculator, "MercedesBenzWebsiteFormCalculator");