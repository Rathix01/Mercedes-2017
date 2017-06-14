import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import LightBox from './lightbox';

const LightboxContainer = (state) => (
	<LightBox id={ state.id + 'Lightbox' } children={state.children} />
);

export default moduleStatepublisher(LightboxContainer, "LightboxContainer");