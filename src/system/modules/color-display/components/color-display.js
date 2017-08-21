import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import { colorDisplayContainer, color } from '../styles';

const colorDisplay = (state) => {
	return <div className={colorDisplayContainer}>
		<div className={color} style={{ "background": state.value || "#777" }}></div>
	</div>
};

module.exports = moduleStatepublisher(colorDisplay, "colorDisplay");