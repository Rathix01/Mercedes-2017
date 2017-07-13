import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';
import { textInput } from '../styles';

const InputText = (state) => {
	return <input type={ state.type || 'text' }  
									className={ `${ getClassName(state) } ${ textInput }` } 
									placeholder={ state.placeholder }
									onChange={state.handleEvent} 
									value={ state.value || "" }
								/>
}

export default readAndWrite(InputText, "InputText")