import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';

import LoadingBar from '../../mb-loading-bar-and-icon';
import FrontPage from '../../mb-front-page';
import FormPage from '../../mb-form-page';

const mercedesBenzWebsite = (state) => {
	return (
		<div>
			<FrontPage id="FrontPage" />
			<FormPage id="FormPage" />
			<LoadingBar id="FullPageLoadingBar" />
		</div>
	);
};

export default moduleStatepublisher(mercedesBenzWebsite, "MercedesBenzWebsite");