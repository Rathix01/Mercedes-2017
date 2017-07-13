import React from 'react';
import read from '../../../components/read-state';
import Text from '../../text';
import { formHeader } from '../styles';

const dynamicForm = (state) => {
	return (<div className={ formHeader }>
		<h1>{ state.title }</h1>
		<div><Text value={ state.text } /></div>
	</div>);
}

export default read(dynamicForm, "DynamicForm");