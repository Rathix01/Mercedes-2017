import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import { container, innerContainer } from '../styles'
import Text from '../../text';
import AnimationContainer from '../../animation-container';
import VisibilityContainer from '../../visibility-container';

const ValidationMessage = (state) => {
	return (<div className={ `${ container } validation-message` }>
		<VisibilityContainer id={ state.id + "Visibility" } className={ innerContainer }>
			<AnimationContainer id={ state.id + "Animation" }>
				<Text id={ state.id + "Message" } value={ state.error || "This field is required" } />
			</AnimationContainer>
		</VisibilityContainer>
	</div>);
}

export default moduleStatepublisher(ValidationMessage, "ValidationMessage");