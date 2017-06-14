import React from 'react';
import R from 'ramda';
import ReactHTMLParser from 'react-html-parser';
import read from '../../../components/read-state';
import { textArea } from '../styles';
import { getClassName } from '../../../stores/component-helper-store';

const parseLineBreaks = (textPart) => {
	return (textPart.type !== undefined) ? textPart : ReactHTMLParser(R.replace(/\n/g, "<br />", textPart));
}
const text = (state) => {
	return  (<div>{ R.map(parseLineBreaks, ReactHTMLParser(state.value)) }</div>);
}

export default read(text)