import React from 'react';
import R from 'ramda';
import readAndWrite from '../../../components/read-and-write-state';
import AnimationContainer from '../../animation-container'
import VisibilityContainer from '../../visibility-container'
import { getClassName } from '../../../stores/component-helper-store';
import { listMember, single } from '../styles';

const renderHeader = (state, component) => {
    return React.cloneElement(component, { id: `${state.id}ToggleListHeader${state.index}`, 
    									   key: `${state.id}ToggleListHeader${state.index}`,
    									   ...state });
}

const renderChild = (state, component) => {
    return React.cloneElement(component, { id: `${state.id}ToggleList${state.index}`, 
    									   key: `${state.id}ToggleList${state.index}`,
    									   ...state });
}

const isListMember = (state) => state.isListMember ? listMember : single;

const detailToggle = (state) => {
	//console.log(state.id);
	return <AnimationContainer id={ `${state.id}Animation` } className={ `${getClassName(state)} ${isListMember(state)}` } key={`${state.id}-key`}>
		<div onClick={state.handleEvent}>{ renderHeader(state, state.headerComponent) }</div>
		<VisibilityContainer id={ state.id + "DetailAreaVisibility" } defaultVisibility={false}>
			<AnimationContainer id={ state.id + "DetailAreaAnimation" }>
				{ renderChild(state, state.itemComponent) }
			</AnimationContainer>
		</VisibilityContainer>
	</AnimationContainer>
}

export default readAndWrite(detailToggle, "DetailToggle");
