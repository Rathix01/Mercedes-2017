import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import InputCheckbox from '../../input-checkbox';
import { getClassName } from '../../../stores/component-helper-store';

const inputCheckboxList = (state) => {
	return (<List id={ state.id + "Checkbox" } items={ state.items }>
		<InputCheckbox uniqueId={ state.uniqueId } />
	</List>);
}

export default moduleStatepublisher(inputCheckboxList, "InputCheckboxList")