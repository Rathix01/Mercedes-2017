import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import LicenseForm from './mb-license-form';
import NoLicenseForm from './mb-no-license-form';
import Button from '../../input-button';
import { container, letsBegin, buttons, noLicenseButton, nextButton } from '../styles';

const mercedesBenzWebsiteFormPageDealer = (state) => {
	return (
		<VisibilityContainer id="FormPageLicenseVisibility" className={container}>
			<div className={letsBegin}>Let's begin with your driver license details</div>
			<LicenseForm id="LicenseForm" />
			<NoLicenseForm id="NoLicenseForm" />
			<div className={buttons}>
				<Button className={noLicenseButton} id="NoNZLIcense"></Button>
				<Button className={nextButton} id="NZLicenseNext">Next</Button>
			</div>
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageDealer, "MercedesBenzWebsiteFormPageDealer");