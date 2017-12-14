import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import InputRadioButton from '../../input-radio-button';
import { getClassName } from '../../../stores/component-helper-store';
import StateListener from '../../../components/state-listener';
import { radio, container } from '../styles'

const InputRadioList = (state) => {
	return (<div>
		<List id={ state.id + "Radio" } items={ state.items } className={ container }>
			<InputRadioButton 
				uniqueId={ state.uniqueId } 
				className={ `${ radio } 
				${ getClassName(state) }` } 
				colors={state.colors}
				/>
		</List>
		<StateListener id={ `${state.id}Updates` } isQuestion={true} label="Label" formInputType="InputRadioList"  />
	</div>);
}

export default moduleStatepublisher(InputRadioList, "InputRadioList")