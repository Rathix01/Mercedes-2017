import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import VisibilityContainer from '../../visibility-container';
import InputAutocomplete from '../../input-autocomplete';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import InputButton from '../../input-button';
import AddressDisplay from './mb-address-display';
import LocationMarker from '../images/location-marker.png';
import { container, location, searchArea, searchInput, nextButton, lookupArea,
		  dealerTitle, addressStatus, years, addressBottomSection, addressBottomSectionField } from '../styles';

const mercedesBenzWebsiteFormPageAddress = (state) => {
	return (
		<VisibilityContainer id="FormPageAddressVisibility" className={container}>
			<div className={lookupArea}>
				<div className={dealerTitle}>Add your address details</div>
				<div className={searchArea}>
					<div className={searchInput}>
						<InputAutocomplete id="AddressLookup" 
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
			</div>
			<AddressDisplay id="AddressDisplay" />
			<div className={addressBottomSection}>
				<div className={addressBottomSectionField}>
					<InputSelectList id="AddressStatus"
									className={addressStatus} 
									 items={[ "I own this property", 
											  "I rent this property",
											  "Boarding/Living with relatives",
											  "Mortgaged Property" ]} />
				</div>
				<div className={addressBottomSectionField}>
					<label>Number of years at this property &nbsp;</label>
					<InputText id="AddressNumberOfYears" placeholder="Years" className={years} />
				</div>
				<div>
					<InputButton id="AddressNextButton" className={nextButton} text="Next" />
				</div>
			</div>
		</VisibilityContainer>
	);
};

export default readAndWrite(mercedesBenzWebsiteFormPageAddress, "MercedesBenzWebsiteFormPageAddress");