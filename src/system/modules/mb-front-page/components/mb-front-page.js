import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import Header from './mb-front-page-header';
import Menu from './mb-front-page-menu';
import CarList from './mb-front-page-car-list';
import AnimationContainer from '../../animation-container';
import { container, contentContainer, extraInfo } from '../styles';

const mercedesBenzWebsiteFrontPage = (state) => {
	return (
		<div className={container}>
			<AnimationContainer id="FrontPageAnimation" className={contentContainer}>
				<Header id="FrontPageHeader" />
				<Menu id="FrontPageMenu" />
				<CarList id="FrontPageCarList" />
				<div className={extraInfo}>
					<div>* Financed amount include on-road-cost of $1500 and documentation of $235 and PPSR fee of $10.35.</div>
					<div>The Monthly Repayment is based on and insterest rate of $9.75. The actual repayment amount may vary based on the outcome of conversations with your Dealer.</div>
				</div>
			</AnimationContainer>
		</div>
	);
};

export default moduleStatepublisher(mercedesBenzWebsiteFrontPage, "mercedesBenzWebsiteFrontPage");