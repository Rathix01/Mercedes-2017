import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import {button, activeButton} from '../styles';

const toButtonState = (state) => state.active === true ? activeButton : button;

const pageBarButton = (state) => {
	return <div className={toButtonState(state)} onClick={state.handleEvent}>
		{ ( state.pageNumber ) }
	</div>
}

export default readAndWrite(pageBarButton, "PageBarButton");