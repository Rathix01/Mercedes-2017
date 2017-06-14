import React from 'react';
import R from 'ramda';
import readAndWrite from '../../../components/read-and-write-state';
import AnimationContainer from '../../animation-container';
import { button, arm1, arm2, animatedArm } from '../styles';

const plusMinusToggleButton = (state) => {
	return	<div className={ button } onClick={state.handleEvent}>
	   			<AnimationContainer id={ state.id + "Animation" }>
	   				<AnimationContainer id={ state.id + 'ArmAnimation' } className={ animatedArm }>
	   					<div className={ arm1 }  style={{ background: state.crossColor }}></div>
	   				</AnimationContainer>
	   				<div className={ arm2 } style={{ background: state.crossColor }}></div>
		   		</AnimationContainer>
	   		</div>
};

export default readAndWrite(plusMinusToggleButton, "PlusMinusToggleButton");