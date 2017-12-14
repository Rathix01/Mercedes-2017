import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import Button from '../../input-button';
import AnimationContainer from '../../animation-container';
import { container, sliderContainer, back, forward, iconLeft, iconRight } from '../styles';

const contentSlider = (state) => {
	return <div className={container}>
		<div className={sliderContainer}>
			<AnimationContainer id={ `${state.id}Animation` } styles={{ "minWidth": 10000 }}>
				{ state.children }
			</AnimationContainer>
		</div>
		<Button id={ `${state.id}Back` } moveKey={-1} rootId={state.id} className={back}>
			<i className={ `${ iconLeft } fa fa-chevron-left` } />
		</Button>
		<Button id={ `${state.id}Next` } moveKey={1} rootId={state.id} className={forward}>
			<i className={ `${ iconRight } fa fa-chevron-right` } />
		</Button>
	</div>
}

export default moduleStatepublisher(contentSlider, "ContentSlider");