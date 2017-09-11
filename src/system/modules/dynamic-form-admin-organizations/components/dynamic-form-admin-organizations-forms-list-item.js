import React from 'react';
import read from '../../../components/read-state';
import List from '../../list';
import { submittedFormItem, itemCell } from '../styles';

const formatDate = (state) => `${ new Date(state).toLocaleString() }`;

const orgFormsList = (state) => {
	return (
		<div className={ submittedFormItem }>
			<div className={itemCell}>
				{ state.itemState.formName }
			</div>
			<div className={itemCell}>
				{ state.itemState.instance }
			</div>
			<div className={itemCell}>
				{ formatDate(state.itemState.lastModified) }
			</div>
			<div className={itemCell}>
				<a href={ `/?org=St+Vincents
							&form=${ state.itemState.formName }
							&stamp=${ state.itemState.formName }
							&publish=true` }>
					View Form
				</a>
			</div>
		</div>
	)
}

export default read(orgFormsList, "OrgFormsList");