import React from 'react';
import read from '../../../components/read-state';
import Text from '../../text';
import { formText } from '../styles';

const dynamicForm = (state) => {
	return (<div className={ formText }>
		<h3>{ state.title }</h3>
		<Text value={ state.text } />
	</div>);
}

export default read(dynamicForm, "DynamicForm");