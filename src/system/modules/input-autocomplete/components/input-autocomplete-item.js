import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { autoCompleteItem } from '../styles';

const inputAutoCompleteItem = (state) => {
	return <div onClick={state.handleEvent} className={autoCompleteItem}>
			{ state.text }
		</div>
}

export default readAndWrite(inputAutoCompleteItem, "InputAutoCompleteItem")