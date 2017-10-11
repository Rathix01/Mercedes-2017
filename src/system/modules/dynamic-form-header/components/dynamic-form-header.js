import React from 'react';
import read from '../../../components/read-state';
import Text from '../../text';
import { formHeader, formHeaderText } from '../styles';

const dynamicForm = (state) => {
	return (<div className={ formHeader } style={{ "background": state.orgColor1 }}>
		<div className={ formHeaderText } style={{ "color": state.orgColor2 }}>
			<h1>{ state.title }</h1>
			<div><Text value={ state.text } /></div>
		</div>
	</div>);
}

export default read(dynamicForm, "DynamicForm");