import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';
import { textInput } from '../styles';

const InputText = (state) => <input type={ state.type || 'text' }  
									className={ `${ getClassName(state) } ${ textInput }` } 
									placeholder={ state.placeholder }
									onChange={state.handleEvent} 
								/>

export default readAndWrite(InputText, "InputText")