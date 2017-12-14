import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';
import { textInput } from '../styles';

const getValue = (state) =>  state.targetValue !== undefined 
									? state.targetValue
									: state.value !== undefined ? state.value : "";

const InputText = (state) => {
	return <input type={ state.type || 'text' }  
									className={ `${ getClassName(state) } ${ textInput }` } 
									placeholder={ state.placeholder }
									onChange={state.handleEvent} 
									value={ getValue(state) } />
}

export default readAndWrite(InputText, "InputText")