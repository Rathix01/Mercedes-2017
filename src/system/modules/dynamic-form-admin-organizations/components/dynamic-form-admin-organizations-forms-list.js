import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import List from '../../list';
import VisibilityContainer from '../../visibility-container';
import OrgFormsListItem from './dynamic-form-admin-organizations-forms-list-item';
import InputSelectList from '../../input-select-list';
import Text from '../../text';
import { formsList, formsListTop, assignFormArea, assignFormUrl, assignFormInputs, assignFormInput, assignFormButton, areaTitle, formListArea } from '../styles';

const orgFormsList = (state) => {
	return (
		<div className={ formsList }>
			<div className={assignFormArea}>
				<div className={areaTitle}>Assign New Form</div>
				<div className={ assignFormInputs }>
					<div className={ assignFormInput }>
						<InputSelectList id="OrgFormsSelect" />
					</div>
					<div className={ assignFormInput }>
						<div id="assign-new-form" className={assignFormButton} onClick={state.handleEvent}>Assign Form</div>
					</div>
				</div>
				<VisibilityContainer id='AssignedUrlVisibilityContainer'>
					<div className={ assignFormUrl }>
						<Text id="AssignedUrl" />
					</div>
				</VisibilityContainer>
			</div>
			<div className={formListArea}>
				<div className={areaTitle}>
					Submitted Forms
				</div>
				<div className={ formsListTop }>
					<List id="OrgFormsListSmall">
						<OrgFormsListItem />
					</List>
				</div>
			</div>
		</div>
	)
}

export default readAndWrite(orgFormsList, "OrgFormsList");