import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';
import { container, label, input } from '../styles';

const isHighlighted = (state) => state.checked !== true ? "#ddd" : state.colors.orgColor1;
const isTextHighlighted = (state) => state.checked !== true ? state.colors.orgColor4 : state.colors.orgColor2;

const InputRadio = (state) => {
	return <div className={`${getClassName(state)} ${container}`}>
		<label htmlFor={ state.id } style={{ color: isTextHighlighted(state), backgroundColor: isHighlighted(state) }} className={label}> { state.label || state.text } </label>
		<input id={ state.id } 
			   checked={ state.checked ? true : false } 
			   type='radio'
			   className={ input }
			   onChange={state.handleEvent} />
	</div>
}

export default readAndWrite(InputRadio, "InputRadio")