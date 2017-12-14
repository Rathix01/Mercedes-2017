import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import InputText from '../../input-text';
import Flag from '../images/flag.png';
import { licenseFormContainer, innerLicenseContainer, area, noLicense, noLicenseInput, noLicenseTitle } from '../styles';

const mercedesBenzWebsiteFormPageDealer = (state) => {
	return (
			<VisibilityContainer id="NoLicenseFormVisibility" className={licenseFormContainer}>
				<div className={innerLicenseContainer}>
					<div className={noLicense}>
						<div className={noLicenseTitle}>For non NZ Diver license holders</div>
						<div className={area}>
							<InputText id="FirstName" placeholder="First Name" className={noLicenseInput} />
						</div>
						<div className={area}>
							<InputText id="LastName" placeholder="Last Name" className={noLicenseInput} />
						</div>
						<div className={area}>
							<InputText id="LastName" placeholder="Date of birth dd/mm/yyyy" className={noLicenseInput} />
						</div>
					</div>
				</div>
			</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageDealer, "MercedesBenzWebsiteFormPageDealer");