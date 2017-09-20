import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';

const inputCheckbox = (state) => {
	return <div>
		<input id={ state.id } checked={ state.checked ? true : false } type='checkbox' className={getClassName(state)} onChange={state.handleEvent} />
		<label htmlFor={ state.id }> { state.label || state.text } </label>
	</div>
}

export default readAndWrite(inputCheckbox, "InputCheckbox")