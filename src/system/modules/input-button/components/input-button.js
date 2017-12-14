import React from 'react';
import R from 'ramda';
import readWrite from '../../../components/read-and-write-state';
import { getClassName } from '../../../stores/component-helper-store';
import { container } from '../styles';

const getColors = R.curry((key, state) => state.colors ? state.colors[key] : ""); 

const inputButton = (state) => {
	return (<div className={ `${getClassName(state)} ${container}` } 
				 style={{ 'backgroundColor': getColors("orgColor1"), 'color': getColors("orgColor2") }}
				 onClick={state.handleEvent}>
				{ state.children }{ state.text || state.itemValue }
			</div>
		);
}

export default readWrite(inputButton, "InputButton")