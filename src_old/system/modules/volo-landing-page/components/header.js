import React from 'react';
import read from '../../../components/read-state';
import Logo from '../../logo'
import Styles from '../styles'

const Header = (state) => {
	return <div className={ Styles.header }>
		<Logo id="HeaderLogo" />
	</div>
}

export default read(Header);
