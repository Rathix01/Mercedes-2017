import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';
import InputTextArea from '../components/input-textarea';
import Text from '../../text';
import { textInput, text, textColumn, textDisplay } from './demo-styles';

const textDemo = (state) => <div className={ text }>
		<div className={ textColumn }>
			<h3> Multi-line basic text </h3>
			<p> Enter a value to see it populated on the right </p>
			<InputTextArea id="BasicDemoInputTextArea" className={ textInput } />
		</div>
		<div className={ textDisplay }>
			<h3>Your Text:</h3> 
			<Text id="BasicDemoTextAreaValue" />
		</div>
	</div>

export default read(textDemo, "TextDemo")
