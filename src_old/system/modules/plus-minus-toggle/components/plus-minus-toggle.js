import React from 'react';
import R from 'ramda';
import moduleStatePublisher from '../../../components/module-state-publisher';
import PlusMinusToggleButton from './plus-minus-toggle-button';
import { container } from '../styles';

const plusMinusToggle = (state) => {
	return <div className={container}>
		<PlusMinusToggleButton id={ `${state.id}Button` } target={ state.target } crossColor={ state.crossColor } />
	</div>;
};

export default moduleStatePublisher(plusMinusToggle, "PlusMinusToggle");