import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';

const InputTextArea = (state) => {
	return <textarea className={getClassName(state)} onChange={state.handleEvent} value={ state.value }></textarea>
}

export default readAndWrite(InputTextArea, "InputTextArea")