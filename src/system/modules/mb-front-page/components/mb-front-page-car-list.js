import React from 'react';
import read from '../../../components/read-state';
import List from '../../list';
import ContentSlider from '../../content-slider';
import CarItem from './mb-front-page-car-list-item';
import { carListContainer, carListItemsContainer } from '../styles';

const mercedesBenzWebsiteFrontPageCarList = (state) => {
	return (
		<div className={carListContainer}>
			<ContentSlider id="CarListSlider">
				<List id="CarList" className={carListItemsContainer}>
					<CarItem />
				</List>	
			</ContentSlider>
		</div>
	);
};

export default read(mercedesBenzWebsiteFrontPageCarList, "MercedesBenzWebsiteFrontPageCarList");