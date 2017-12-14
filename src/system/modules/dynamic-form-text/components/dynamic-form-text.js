import React from 'react';
import read from '../../../components/read-state';
import Text from '../../text';
import { formText, header, content, text, image, error, errorText } from '../styles';

const getDisplay = (key, state) => state[key] && state[key].length > 0 ? "" : "none";
const getDisplayMode = (displayMode) => displayMode === undefined ? "" : {
	error: error }[displayMode];

const getTextDisplayMode = (displayMode) => displayMode === undefined ? "" : {
	error: errorText }[displayMode];

const dynamicFormText = (state) => {
	//console.log(state.displayMode)
	return (<div className={ formText }>
		<div className={ getDisplayMode(state.displayMode) }>
			<h3 className={ header } style={{ "color": state.orgColor3, "display": getDisplay("title", state) }}>
				<span className={ getTextDisplayMode(state.displayMode) }>{ state.title }</span>
			</h3>
			<div className={content}>
				<div style={{ "color": state.orgColor4, "display": getDisplay("text", state) }} className={ text }>
					<span className={ getTextDisplayMode(state.displayMode) }><Text value={ state.text } /></span>
				</div>
				<div className={ image } style={{ display: getDisplay("image", state) }}>
					<img src={state.image} />
				</div>
			</div>
		</div>
	</div>);
}

export default read(dynamicFormText, "DynamicFormText");