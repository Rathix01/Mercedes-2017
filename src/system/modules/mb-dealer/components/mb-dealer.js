import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import InputAutocomplete from '../../input-autocomplete';
import LocationMarker from '../images/location-marker.png';
import List from '../../list';
import ListItem from './mb-dealer-list-item';
import { container, location, searchArea, searchInput, dealerTitle, dealerList } from '../styles';

const mercedesBenzWebsiteFormPageDealer = (state) => {
	return (
		<VisibilityContainer id="FormPageDealerVisibility" className={container}>
			<div>
				<div className={dealerTitle}>Find a dealer close to you</div>
				<div className={searchArea}>
					<div className={searchInput}>
						<InputAutocomplete id="DealerLocations" 
										   colors={{}}
										   inputStyle={searchInput}
										   border={"none"}
										   searchKeys={["line1", "line2", "suburb", "city", "postcode"]}
										   searchType='address' />
					</div>
					<div className={location}>
						<img src={LocationMarker} />
					</div>
				</div>
				<div className={dealerTitle}>Or choose a dealer from the list</div>
				<List id="DealerList" className={dealerList}>
					<ListItem />
				</List>
			</div>
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageDealer, "MercedesBenzWebsiteFormPageDealer");