import React from 'react';
import R from 'ramda';
import VisibilityContainer from '../../visibility-container';
import readWrite from '../../../components/read-and-write-state';
import { tabs, tab, labels, label, content, active } from '../styles';


const mapIndexed = R.addIndex(R.map);
const getActiveClass = (state, item, idx) => {
	const keyLength = state.show ? state.show.length : 0;
	const keyIndex = state.show ? state.show.substring(keyLength - 1) : "1"
	return parseInt(keyIndex) === idx ? active : "";
};
const toTabPanel = R.curry((state, item, idx) => <VisibilityContainer key={ `tabPanel${idx}` } 
																	  id={ `${state.rootId}TabPanelVisibility${idx}` }>
																	  	{ item }
																	</VisibilityContainer>);


const toTabLabel = R.curry((state, item, idx) => <div key={ `tabLabel${idx}` } 
													  onClick={state.handleEvent}
													  className={`${getActiveClass(state, item, idx)} ${label}`}
													  data-target={ `${state.rootId}TabPanelVisibility${idx}`}>
														{ state.labels[idx] }
													</div>);

const tabPanelsAndLabels = (state) => {
	return (
		<div className={tabs}>
			<div className={labels}>{ mapIndexed(toTabLabel(state), state.items) }</div>
			<div className={content}>{ mapIndexed(toTabPanel(state), state.items) }</div>
		</div>
	);
};

export default readWrite(tabPanelsAndLabels, "TabPanelsAndLabels");	
