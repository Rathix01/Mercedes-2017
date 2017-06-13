import React from 'react';
import R from 'ramda';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';

const toOptions = R.curry(( state, option ) => {
    let keyValue = typeof(option) === 'string' ? option : option.value;
    return <option  key={ keyValue }
                    value={typeof(option) === 'string' ? option : option.value }>
                      { typeof(option) === 'string' ? option : (option.text || option.value) }
           </option>;
});

const InputSelect = (state) => <select className={getClassName(state)} onChange={state.handleEvent} value={ state.value }>
		{ state.items.map(toOptions(state)) }
	</select>

export default readAndWrite(InputSelect, "InputSelect")