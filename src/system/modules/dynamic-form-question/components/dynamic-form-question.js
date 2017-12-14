import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import InputField from '../../input-field';
import { question, altQuestion, label, input } from '../styles';

const renderChild = (state, c) => {
	  const Component = c;
  	const component = Component ? <Component /> : null;
    const nextState = R.merge(state.itemState, { itemLabel: state.title, itemValue: state.text });

    return React.cloneElement(component, { id: `${state.id}Question${state.index}`, 
    									   key: `${state.id}Question${state.index}`,
    									   uniqueId: state.uniqueId,
    									   isQuestion: true,
    									   itemValue: state.itemState.value,
                         rules: state.rules,
                         colors: toColors(state),
    									   ...nextState });
}

const toColors = (state) => ({ orgColor1: state.orgColor1, 
                              orgColor2: state.orgColor2, 
                              orgColor3: state.orgColor3, 
                              orgColor4: state.orgColor4 });

const dynamicFormSection = (state) => {
	return <div className={ state.index % 2 ? question : question }>
		<InputField id={ `${state.id}InputField`  } label={ state.title } color={state.orgColor4} colors={toColors(state)}>
			{ renderChild(state, state.itemInput) }
		</InputField>
	</div>
}

export default moduleStatepublisher(dynamicFormSection, "DynamicFormSection");