import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import AnimationContainer from '../../animation-container'
import VisibilityContainer from '../../visibility-container'

const renderChild = (state, c) => {
	const Component = c;
  	const component = Component ? <Component /> : null;

    return React.cloneElement(component, { id: `${state.id}ToggleList${state.index}`, 
    									   key: `${state.id}ToggleList${state.index}`,
    									   ...state });
}

const dynamicFormSection = (state) => {
	return <AnimationContainer id={ `${state.id}Animation` } key={`${state.id}-key`}>
		<VisibilityContainer id={ state.id + "DetailAreaVisibility" } defaultVisibility={true}>
			<AnimationContainer id={ state.id + "DetailAreaAnimation" }>
				{ renderChild(state, state.itemComponent) }
			</AnimationContainer>
		</VisibilityContainer>
	</AnimationContainer>
}

export default readAndWrite(dynamicFormSection, "DynamicFormSection");