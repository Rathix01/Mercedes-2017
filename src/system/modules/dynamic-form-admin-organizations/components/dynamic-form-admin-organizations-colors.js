import React from 'react';
import readWrite from '../../../components/read-and-write-state';
import StateListener from '../../../components/state-listener';
import VisibilityContainer from '../../visibility-container';
import InputSelectList from '../../input-select-list';
import InputText from '../../input-text';
import SavingNotification from '../../saving-notification';
import ColorDisplay from '../../color-display';
import { inputArea, createForm, orgAndForm, newForm, adminContainer, inputAreaSection } from '../styles';

const toItems = () => [
	{ text: "Blue 1", value: "#3D8EB9" },
	{ text: "Blue 2", value: "#0C68AF" },
	{ text: "Purple", value: "#48378D" },
	{ text: "Gray", value: "#D0D4D7" },
	{ text: "White", value: "#EFEFEF" },
	{ text: "Black", value: "#333333" },
];

const dynamicFormAdminOrganizationColors = (state) => {
	return (
	<div>
		<div className={inputArea}>
			<div className={inputAreaSection}>
				<label>Background Color</label>
			</div>
			<div className={inputAreaSection}>
				<InputSelectList id="OrgColor1" items={toItems()} />
			</div>
			<div className={inputAreaSection}>
				<ColorDisplay id="DisplayOrgColor1" />
			</div>
		</div>
		<div className={inputArea}>
			<div className={inputAreaSection}>
				<label>Header Text Color</label>
			</div>
			<div className={inputAreaSection}>
				<InputSelectList id="OrgColor2" items={toItems()} />
			</div>
			<div className={inputAreaSection}>
				<ColorDisplay id="DisplayOrgColor2" />
			</div>
		</div>
		<div className={inputArea}>
			<div className={inputAreaSection}>
				<label>Text Header Color</label>
			</div>
			<div className={inputAreaSection}>
				<InputSelectList id="OrgColor3" items={toItems()} />
			</div>
			<div className={inputAreaSection}>
				<ColorDisplay id="DisplayOrgColor3" />
			</div>
		</div>
		<div className={inputArea}>
			<div className={inputAreaSection}>
				<label>Text Color</label>
			</div>
			<div className={inputAreaSection}>
				<InputSelectList id="OrgColor4" items={toItems()} />
			</div>
			<div className={inputAreaSection}>
				<ColorDisplay id="DisplayOrgColor4" />
			</div>
		</div>
		<div className={inputArea}>
			<div onClick={ state.handleEvent } id="updateColor" className={newForm}>
				<i className="fa fa-plus"></i> Apply
			</div>
		</div>
		<div>
			<SavingNotification id="ColorUpdateSavingNotification" />
		</div>
	</div>
	);
};

module.exports = readWrite(dynamicFormAdminOrganizationColors, "DynamicFormAdminOrganizationColors");

/*

		
		<div className={inputArea}>
			<div className={inputAreaSection}>
				<label>Text Color</label>
			</div>
			<div className={inputAreaSection}>
				<InputSelectList id="OrgColor5" items={toItems()} />
			</div>
			<div className={inputAreaSection}>
				<ColorDisplay id="DisplayOrgColor5" />
			</div>
		</div>

		*/