import React from 'react';
import read from '../../../components/read-state';
import List from '../../list';
import MenuItem from './mb-front-page-menu-item';
import { menuContainer, menuOptionsContainer } from '../styles';

const mercedesBenzWebsiteFrontPageMenu= (state) => {
	return (
		<div className={menuContainer}>
			<List id="MenuOptions" className={menuOptionsContainer}>
				<MenuItem />
			</List>
		</div>
	);
};

export default read(mercedesBenzWebsiteFrontPageMenu, "MercedesBenzWebsiteFrontPageMenu");