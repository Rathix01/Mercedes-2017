import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';
import Lightbox from '../../lightbox';
import { container, btn } from './demo-styles';

const lightboxDemo = (state) => <div className={ container }>
		<Lightbox id='DemoLightbox'><div>The lightbox content goes here</div></Lightbox>
		<button className={ btn } onClick={state.handleEvent}>Open Lightbox</button>
	</div>

export default readAndWrite(lightboxDemo, "LightboxDemo")
