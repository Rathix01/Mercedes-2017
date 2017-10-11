import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import InputRadioButton from '../../input-radio-button';
import { getClassName } from '../../../stores/component-helper-store';
import StateListener from '../../../components/state-listener';

const InputRadioList = (state) => {
	return (<div>
		<List id={ state.id + "Radio" } items={ state.items }>
			<InputRadioButton uniqueId={ state.uniqueId } />
		</List>
		<StateListener id={ `${state.id}Updates` } isQuestion={true} label="Label" formInputType="InputRadioList"  />
	</div>);
}

export default moduleStatepublisher(InputRadioList, "InputRadioList")