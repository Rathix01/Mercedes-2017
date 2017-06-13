import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import DetailToggle from './detail-toggle';

const detailToggleContainer = (state) => {
	return (<DetailToggle id={ state.id } siblingKey={ state.siblingKey }>
		{ state.children }
	</DetailToggle>
);
}

export default moduleStatepublisher(detailToggleContainer, "DetailToggleContainer");