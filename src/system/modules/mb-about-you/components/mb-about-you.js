import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import InputText from '../../input-text';
import InputButton from '../../input-button';
import InputSelectList from '../../input-select-list';
import { container, title, employmentColumn1, employmentColumn2, personalLine1, personalLine2, maritalInput,
		titleInput, nameInput, dependantsInput, employmentArea, employmentInput, nextButton } from '../styles';

const mercedesBenzWebsiteFormPageAboutYou = (state) => {
	return (
		<VisibilityContainer id="FormPageAboutYouVisibility" className={container}>
			<div className={title}>Finally, some more about you</div>
			<div className={personalLine1}>
				<div>
					<InputSelectList id="Title"
						className={titleInput}
						items={["Add a title",
								"Mr",
								"Mrs",
								"Miss",
								"Dr.",
								"Prof.",
								"Sir.",
								"Dame",
								"Other"
								]} />
				</div>
				<div>
					<InputText id="FirstName" placeholder="First Name" className={ nameInput } />
				</div>
				<div>
					<InputText id="LastName" placeholder="Last Name" className={ nameInput } />
				</div>
				<div>
					<InputSelectList id="MaritalStatus"
						className={maritalInput}
						items={["Marital Status",
								"Partner",
								"Married",
								"Widowed",
								"Divorced",
								"Single"
								]} />
				</div>
			</div>
			<div className={personalLine2}>
				<div>
					<InputText id="NumberOfDependants" placeholder="No. of Dependants?" className={dependantsInput} />
				</div>
			</div>
			<div className={title}>
				Employment Details
			</div>
			<div className={employmentArea}>
				<div className={employmentColumn1}>
					<div>
						<InputText id="Occupation" placeholder="Occupation" className={employmentInput} />
					</div>
					<div>
						<InputText id="Employer" placeholder="Employer" className={employmentInput} />
					</div>
					<div>
						<InputSelectList id="WorkDuration"
							 className={employmentInput}
							items={["I have worked here over 3 years",
									"I have worked here less than 3 years",
									]} />
					</div>
				</div>
				<div className={employmentColumn2}>
					<div>
						<InputSelectList id="EmploymentTitle"
							 className={employmentInput}
							items={["Professonal",
									"Diplomat",
									"Director",
									"Engineer/Techincian",
									"Executive",
									"Other",
									"Office",
									"Beneficiary/Unemployed",
									]} />
					</div>
					<div>
						<InputSelectList id="EmploymentType"
							 className={employmentInput}
							items={["Full time employment",
									"Casual",
									"Part Time",
									"Retired",
									"Unemployed",
									"Other"
									]} />
					</div>
				</div>
			</div>
			<div>
				<InputButton id="AboutYouNextButton" text="Next" className={nextButton} />
			</div>
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageAboutYou, "MercedesBenzWebsiteFormPageAboutYou");