import React from 'react';
import read from '../../../components/read-state';
import List from '../../list';
import OrgFormsListItem from './dynamic-form-admin-organizations-forms-list-item';
import InputSelectList from '../../input-select-list';
import Text from '../../text';
import { formsList, formsListTop, assignFormArea, assignFormUrl, assignFormInputs } from '../styles';

const orgFormsList = (state) => {
	return (
		<div className={ formsList }>
			<div className={assignFormArea}>
				<div>Assign New Form</div>
				<div className={ assignFormInputs }>
					<div>
						<InputSelectList id="OrgFormsSelect" />
					</div>
					<div>
						<button id="assign-new-form">Assign Form</button>
					</div>
				</div>
				<div className={ assignFormUrl }>
					<Text id="AssignedUrl" />
				</div>
			</div>
			<div>
				Submitted Forms
			</div>
			<div className={ formsListTop }>
				<List id="OrgFormsListSmall">
					<OrgFormsListItem />
				</List>
			</div>
		</div>
	)
}

export default read(orgFormsList, "OrgFormsList");