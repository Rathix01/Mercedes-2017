import React from 'react';
import readAndWrite from '../../../components/read-and-write-state';
import { menuContainer, menuOptionsContainer, selected, menuItem } from '../styles';

const getMenuClass = (state) => state.selected === true ? selected : menuItem;

const mercedesBenzWebsiteFrontPageMenuItem = (state) => {
	return (<div className={ getMenuClass(state) } onClick={ state.handleEvent }>{ state.text }</div>);
};

export default readAndWrite(mercedesBenzWebsiteFrontPageMenuItem, "MercedesBenzWebsiteFrontPageMenuItem");