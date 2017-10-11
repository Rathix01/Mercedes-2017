import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import InputCheckbox from '../../input-checkbox';
import { getClassName } from '../../../stores/component-helper-store';
import StateListener from '../../../components/state-listener';

const inputCheckboxList = (state) => {
	return (<div>
				<List id={ state.id + "Checkbox" } items={ state.items }>
					<InputCheckbox uniqueId={ state.uniqueId } listRoot={`${state.rootId}Input`} />
				</List>
				<StateListener id={ `${state.id}Updates` } isQuestion={ true } label="Label" formInputType="InputCheckboxList"  />
			</div>
		);
}

export default moduleStatepublisher(inputCheckboxList, "InputCheckboxList")