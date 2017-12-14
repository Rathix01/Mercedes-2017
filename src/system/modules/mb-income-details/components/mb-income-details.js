import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import InputText from '../../input-text';
import InputButton from '../../input-button';
import InputSelectList from '../../input-select-list';
import { container, title, employmentColumn1, employmentColumn2, incomeRow, employmentField,
		titleInput, incomeInput, dependantsInput, employmentArea, employmentInput, nextButton, calcButton } from '../styles';

const mercedesBenzWebsiteFormPageIncomeDetails = (state) => {
	return (
		<VisibilityContainer id="FormPageIncomeDetailsVisibility" className={container}>
			<div className={title}>We also need come income details</div>
			<div className={incomeRow}>
				<div>
					<InputText id="MonthlyIncome" placeholder="Net monthly income after tax" className={ incomeInput } />
				</div>
				<div>
					<InputButton id="CalculateSalary" text="Calculate from Yearly Salary" className={calcButton} />
				</div>
			</div>

			<div className={title}>
				Monthly Mortgage / Rent / Board and other repayments
			</div>
			<div className={employmentArea}>
				<div className={employmentColumn1}>
					<div className={employmentField}>
						$ <InputText id="MortgageRentOrBoard" placeholder="Mortgage, rent, or board payments" className={employmentInput} />
					</div>
					<div className={employmentField}>
						$ <InputText id="OtherRepayments" placeholder="Total other repayments, eg: Overdraft, Hire Purchase" className={employmentInput} />
					</div>
					<div className={employmentField}>
						$ <InputText id="CreditCardPayments" placeholder="Total other credit card payments" className={employmentInput} />
					</div>
				</div>

			</div>
			<div>
				<InputButton id="IncomeDetailsNextButton" text="Next" className={nextButton} />
			</div>
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageIncomeDetails, "mercedesBenzWebsiteFormPageIncomeDetails");