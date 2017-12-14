import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import InputAutocomplete from '../../input-autocomplete';
import LocationMarker from '../images/location-marker.png';
import { listItemContainer, selectDealerButton } from '../styles';

const mercedesBenzWebsiteFormPageDealer = (state) => {
	return (
		<div className={listItemContainer}>
			<div><strong>{ state.title }</strong></div>
			<div><strong>{ state.location }</strong></div>
			<div>{ state.addressLine1 }</div>
			<div>{ state.addressLine2 }</div>
			<div>{ state.addressLine3 }</div>
			<div>{ state.phone }</div>
			<div>{ state.fax }</div>
			<div>{ state.website }</div>
			<div>
				<div className={selectDealerButton} onClick={state.handleEvent}>Select Dealer</div>
			</div>
		</div>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageDealer, "MercedesBenzWebsiteFormPageDealer");