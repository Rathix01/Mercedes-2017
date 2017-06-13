import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import InputRadioButton from '../../input-radio-button';
import { getClassName } from '../../../stores/component-helper-store';

const InputRadioList = (state) =>
	<List id={ state.id + "Radio" } items={ state.items }>
		<InputRadioButton />
	</List>;

export default moduleStatepublisher(InputRadioList, "InputRadioList")