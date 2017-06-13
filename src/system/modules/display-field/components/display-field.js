import React from 'react';
import read from '../../../components/read-state';
import { container, dataField, stackedDataField, label, labelText, valueText, icon } from '../styles'

const displayField = (state) => {
	return <div className={ container }>
		<div className={ state.stack !== true ? dataField : stackedDataField }>
			<div className={ label }>
				<div className={ icon } style={{ background: state.componentColor }}><i className={ `fa ${ state.icon }` } /></div>
				<span className={ labelText }>{ state.label }</span> 
			</div>
			<div className={ valueText }>{ state.value }</div>
		</div>
	</div>
}

export default read(displayField, "DisplayField");