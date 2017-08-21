import React from 'react';
import read from '../../../components/read-state';
import Text from '../../text';
import { formText } from '../styles';

const dynamicFormText = (state) => {
	return (<div className={ formText }>
		<h3 style={{ "color": state.orgColor3 }}>{ state.title }</h3>
		<div style={{ "color": state.orgColor4 }}><Text value={ state.text } /></div>
	</div>);
}

export default read(dynamicFormText, "DynamicFormText");