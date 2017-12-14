import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import DefaultCarImage from '../images/example-car-image.png';
import { carItem, carImage, carName, carRRP, carWeekly, selectCarButton } from '../styles';

const getCarImage = (state) => state.img !== undefined ? state.img : DefaultCarImage

const mercedesBenzWebsiteFrontPageCarListItem = (state) => {
	return (<div className={carItem}>
		<div className={carImage}>
			<img src={getCarImage(state)} />
		</div>
		<div className={carName}>{ state.name }</div>
		<div className={carRRP}>rrp ${state.rrp}</div>
		<div className={carWeekly}>FROM ${state.from} weekly*</div>
		<div className={selectCarButton} onClick={state.handleEvent}>Apply NOW</div>
	</div>);
};

export default readAndWrite(mercedesBenzWebsiteFrontPageCarListItem, "MercedesBenzWebsiteFrontPageCarListItem");