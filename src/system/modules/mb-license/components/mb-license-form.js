import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import InputText from '../../input-text';
import Flag from '../images/flag.png';
import { licenseFormContainer, innerLicenseContainer, 
		buttons, noLicenseButton, nextButton, formColumnLeft, formColumnRight, licenseNameInput,
		formTitle, area, splitArea, shortInput } from '../styles';

const mercedesBenzWebsiteFormPageDealer = (state) => {
	return (
			<VisibilityContainer id="LicenseFormVisibility" className={licenseFormContainer} defaultVisibility={true}>
				<div className={innerLicenseContainer}>
					<div className={formColumnLeft}>
						<img src={Flag} />
					</div>
					<div className={formColumnRight}>
						<div className={formTitle}>NEW ZEALAND DRIVER LICENSE</div>
						<div className={area}>
							<InputText id="LastName" placeholder="Last Name" className={licenseNameInput} />
						</div>
						<div className={area}>
							<InputText id="LastName" placeholder="First Name" className={licenseNameInput} />
						</div>
						<div className={area}>
							<InputText id="LastName" placeholder="Middle Name" className={licenseNameInput} />
						</div>
						<div className={splitArea}>
							<div>
								<InputText id="LastName" placeholder="Date of Birth" className={shortInput} />
							</div>
							<div>
								<InputText id="LastName" placeholder="Expiry" className={shortInput} />
							</div>
						</div>
						<div className={splitArea}>
							<div>
								<InputText id="LastName" placeholder="Number" className={shortInput} />
							</div>
							<div>
								<InputText id="LastName" placeholder="Version" className={shortInput} />
							</div>
						</div>
					</div>
				</div>
			</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageDealer, "MercedesBenzWebsiteFormPageDealer");