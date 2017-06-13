import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import Styles from '../styles'
import Text from '../../text';
import ValidationMessage from '../../validation-message';

const renderChild = R.curry((state, child) => {
	return React.cloneElement(child, { id: `${state.id}Input`, key: `${state.id}Input`, rootId: state.rootId });
});

const InputField = (state) => {
	return (<div className={ `${ Styles.container } input-field` }>
		<Text id={ state.id + "Label" } />
		{R.head(React.Children.map(state.children, renderChild(state)))}
		<ValidationMessage id={ state.id + "InputValidation" } />
	</div>);
}

export default moduleStatepublisher(InputField, "InputField");
