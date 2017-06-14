import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';

const InputRadio = (state) => {
	return <div>
		<label htmlFor={ state.id }> { state.label } </label>
		<input id={ state.id } checked={ state.checked ? true : false } type='radio' className={getClassName(state)} onChange={state.handleEvent} />
	</div>
}

export default readAndWrite(InputRadio, "InputRadio")