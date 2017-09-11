import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import InputField from '../../input-field';
import { question, altQuestion, label, input } from '../styles';

const renderChild = (state, c) => {
	const Component = c;
  	const component = Component ? <Component /> : null;
    return React.cloneElement(component, { id: `${state.id}Question${state.index}`, 
    									   key: `${state.id}Question${state.index}`,
    									   uniqueId: state.uniqueId,
    									   isQuestion: true,
    									   ...state.itemState });
}

const dynamicFormSection = (state) => {
	return <div className={ state.index % 2 ? question : question }>
		<InputField id={ `${state.id}InputField`  } label={ state.title } color={state.orgColor4}>
			{ renderChild(state, state.itemInput) }
		</InputField>
	</div>
}

export default moduleStatepublisher(dynamicFormSection, "DynamicFormSection");