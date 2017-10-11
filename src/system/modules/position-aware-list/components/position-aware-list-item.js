import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import AnimationContainer from '../../animation-container';
import { listItem } from '../styles';

const renderChild = (state, component) => {
    return React.cloneElement(component, { id: `${state.id}ToggleList${state.index}`, 
    									   key: `${state.id}ToggleList${state.index}`,
    									   version: (state.version + 1),
    									   ...state });
}

const positionAwareListItem = (state) => {
	return (<AnimationContainer id={ `${state.id}Animation`} className={listItem}>
		{ renderChild(state, state.component) }
	</AnimationContainer>);
}

module.exports = moduleStatepublisher(positionAwareListItem, "PositionAwareListItem");