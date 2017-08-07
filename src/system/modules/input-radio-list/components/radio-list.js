import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import InputRadioButton from '../../input-radio-button';
import { getClassName } from '../../../stores/component-helper-store';

const InputRadioList = (state) => {
	return (<List id={ state.id + "Radio" } items={ state.items }>
		<InputRadioButton uniqueId={ state.uniqueId } />
	</List>);
}

export default moduleStatepublisher(InputRadioList, "InputRadioList")