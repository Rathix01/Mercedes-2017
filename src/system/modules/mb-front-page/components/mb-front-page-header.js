import React from 'react';
import read from '../../../components/read-state';
import { headerContainer } from '../styles';
import LogoWithText from '../images/logo-with-text.png';
import ChooseYourMerc from '../images/choose-your-merc.png';

const mercedesBenzWebsiteFrontPageHeader = (state) => {
	return (
		<div className={headerContainer}>
			<div>
				<img src={LogoWithText} />
			</div>
			<div>
				<img src={ChooseYourMerc} />
			</div>
			<div style={{ minWidth: 160 }}> </div>
		</div>
	);
};

export default read(mercedesBenzWebsiteFrontPageHeader, "MercedesBenzWebsiteFrontPageHeader");