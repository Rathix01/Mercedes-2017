import React from 'react';
import read from '../../../components/read-state';
import List from '../../list';
import { submittedFormItem, itemCell } from '../styles';

const formatDate = (state) => `${ new Date(state).toLocaleString() }`;
const encodeToUrl = (state) => state.split(" ").join('+');

const orgFormsList = (state) => {
	return (
		<div className={ submittedFormItem }>
			<div className={itemCell} style={{ maxWidth: "60px" }}>
				<i className="fa fa-file"></i>
			</div>
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
				<a href={ encodeToUrl(`/?org=St+Vincents
							&form=${ state.itemState.formName }
							&stamp=${ state.itemState.instance }
							&publish=true`) }
					target='_blank'>
					View Form
				</a>
			</div>
		</div>
	)
}

export default read(orgFormsList, "OrgFormsList");