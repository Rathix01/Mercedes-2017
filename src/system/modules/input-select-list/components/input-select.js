import React from 'react';
import R from 'ramda';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';
import { selectList } from '../styles';

const toOptions = R.curry(( state, option, index ) => {
    let keyValue = typeof(option) === 'string' ? option : option.value;
    return <option key={ keyValue + index.toString() } value={typeof(option) === 'string' ? option : option.value }>
                  { typeof(option) === 'string' ? option : (option.text || option.value) }
           </option>;
});

const InputSelect = (state) => {
	return (<select className={ `${ getClassName(state) } ${ selectList }` }  onChange={state.handleEvent} value={ state.value }>
		{ state.items ? state.items.map(toOptions(state)) : null }
	</select>);
}

export default readAndWrite(InputSelect, "InputSelect")