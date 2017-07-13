import React from 'react';
import R from 'ramda';
import readAndWrite from '../../../components/read-and-write-state';
import DynamicFormAdminControls from '../../dynamic-form-admin-controls';
import { section, basicControls, allControls } from '../styles';

const renderChild = (state, c) => {
	const Component = c;
  	const component = Component ? <Component id={ state.itemKey } componentColor={ state.background } /> : null;
    return React.cloneElement(component, { id: `${state.id}ToggleList${state.index}`, 
    									   key: `${state.id}ToggleList${state.index}`,
    									   ...state });
}

const dynamicFormAdminSection = (state) => {
	return (<div className={ section }>
				{ renderChild(state, state.dataComponent) }
				<DynamicFormAdminControls { ...state } id={ `${ state.id }Controls` } isRoot={true} rootId={ state.id } /> 
			</div>);
}

export default readAndWrite(dynamicFormAdminSection, "DynamicFormAdminSection");
