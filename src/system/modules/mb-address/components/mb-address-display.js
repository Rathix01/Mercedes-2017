import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import Logo from '../images/envelope-logo.png';
import { addressDisplay, envelopeWindow, envelopeLogo } from '../styles';

const mercedesBenzWebsiteFormPageAddressDisplay = (state) => {
	return (
		<div className={addressDisplay}>
			<img src={Logo} className={envelopeLogo} />
			<div className={envelopeWindow}>

			</div>
		</div>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageAddressDisplay, "MercedesBenzWebsiteFormPageAddressDisplay");