import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';
import InputText from '../components/input-text';
import Text from '../../text';
import { textInput, text, textColumn, textDisplay } from './demo-styles';

const textDemo = (state) => <div className={ text }>
		<div className={ textColumn }>
			<h3> A basic text input </h3>
			<p> Enter a value to see it populated on the right </p>
			<InputText id="BasicDemoInputText" className={ textInput } />
		</div>
		<div className={ textDisplay }>
			<h3>Your Text:</h3> 
			<Text id="BasicDemoTextValue" />
		</div>
	</div>

export default read(textDemo, "TextDemo")
