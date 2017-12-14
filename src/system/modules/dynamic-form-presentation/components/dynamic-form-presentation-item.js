import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';
//import { container } from '../styles'; //${container}
import SimpleLine from './dynamic-form-presentation-simple-line';
import DiamondsAndLine from './dynamic-form-presentation-diamonds-and-line';
import BallsAndLine from './dynamic-form-presentation-balls-and-line';
import Balls from './dynamic-form-presentation-balls';
import Diamonds from './dynamic-form-presentation-diamonds';

const getPresentationKey = (state) => state.editState === undefined ? "line" : state.editState.value;
const getPresentationItem = (state, key) => {
	return {
		"line": <SimpleLine item={state} />,
		"diamonds-and-line": <DiamondsAndLine item={state} />,
		"balls-and-line": <BallsAndLine item={state} />,
		"3-balls": <Balls item={state} />,
		"diamonds": <Diamonds item={state} />,
	}[key];
};

const presentationItem = (state) => {
	return (<div className={ `${getClassName(state)}` }>
		{ getPresentationItem(state, getPresentationKey(state)) }
	</div>);
}

export default read(presentationItem, "PresentationItem")