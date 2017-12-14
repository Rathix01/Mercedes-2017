import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import Styles from '../styles'
import Text from '../../text';
import ValidationMessage from '../../validation-message';
import VisibilityContainer from '../../visibility-container'

const renderChild = R.curry((state, child) => {

	return React.cloneElement(child, { id: `${state.id}Input`, key: `${state.id}Input`, rootId: state.rootId, colors: state.colors });
});

const InputField = (state) => {
	return (<div className={ `${ Styles.container } input-field` }>
		<VisibilityContainer id={ `${state.id}LabelVisibility`} defaultVisibility={state.showLabel === false ? false : true} className={ Styles.label }>
			<div style={{ color: state.color }}>
				<Text id={ state.id + "Label" } value={ state.label } className={ Styles.labelInner } />
			</div>
		</VisibilityContainer>
		<div className={ Styles.inputAndValidation }>
			<div className={ Styles.input }>{R.head(React.Children.map(state.children, renderChild(state)))}</div>
			<ValidationMessage id={ state.id + "InputValidation" } />
		</div>
	</div>);
}

export default moduleStatepublisher(InputField, "InputField");
