import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import AnimationContainer from '../../animation-container';
import { panel, content } from '../styles';

const slidePanel = (state) => (<div className={ panel }>
	<AnimationContainer id={ `${state.id}Animation` }>
		<div className={ content }>
			{ state.children }
		</div>
	</AnimationContainer>
</div>);

module.exports = moduleStatepublisher(slidePanel, "SlidePanel");