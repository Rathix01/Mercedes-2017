import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { content, menuItem, icon, eventHandlerElement } from '../styles';

const dynamicFormAdminMenu = (state) => {
	return <div className={content}>
		<div className={menuItem}>
			<div className={icon}>
				<i className="fa fa-home"></i>&nbsp;
			</div>
			<label>Home</label>
			<div className={ eventHandlerElement } id="Org" onClick={state.handleEvent}></div>
		</div>
		<div className={menuItem} style={{ display: "none" }}>
			<div className={icon}>
				<i className="fa fa-file-text-o"></i>&nbsp;
			</div>
			<label>Forms</label>
			<div className={ eventHandlerElement } id="Instances" onClick={state.handleEvent}></div>
		</div>
		<div className={menuItem}>
			<div className={icon}>
				<i className="fa fa-wrench"></i>&nbsp;
			</div>
			<label>Form Admin</label>
			<div className={ eventHandlerElement } id="Form" onClick={state.handleEvent}></div>
		</div>
	</div>
};

module.exports = readAndWrite(dynamicFormAdminMenu, "DynamicFormAdminMenu");