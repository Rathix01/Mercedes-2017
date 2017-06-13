import React from 'react';
import read from '../../../components/read-state';

import InputField from '../../input-field';
import InputText from '../../input-text';
import RadioList from '../../input-radio-list';
import SelectList from '../../input-select-list';
import DatePicker from '../../input-date-picker'
import Styles from '../styles';

export default read((state) => {
	return <div className={ Styles.container }> 
				<h1>Traveller</h1>
				<InputField id={ state.id + 'Salutation' } rootId={ state.id } label="Salutation">
					<SelectList items={[ 'Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Prof', 'Rev', 'Other' ]} />
				</InputField>
				<InputField id={ state.id + 'FirstName' } rootId={ state.id } label="First Name" required={ true }>
					<InputText />
				</InputField>
				<InputField id={ state.id + 'FamilyName' } rootId={ state.id } label="Family Name" required={ true }>
					<InputText />
				</InputField>
				<InputField id={ state.id + 'DateOfBirth' } rootId={ state.id } label="Date of Birth" required={ true }>
					<DatePicker />
				</InputField>
				<InputField id={ state.id + 'Email' } rootId={ state.id } label="Email" required={ true }>
					<InputText />
				</InputField>
				<InputField id={ state.id + 'Phone' } rootId={ state.id } label="Phone" required={ true }>
					<InputText />
				</InputField>
				<InputField id={ state.id + 'UseHeartBeat' } rootId={ state.id } label="Use Heartbeat">
					<RadioList items={ [{ label: "Yes" }, { label: "No" }] } />
				</InputField>
				<InputField id={ state.id + 'Gender' } rootId={ state.id } label="Gender">
					<RadioList items={ [{ label: "Male" }, { label: "Female" }, { label: "other" }] } />
				</InputField>
			</div>
});