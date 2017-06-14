import React from 'react';
import read from '../../../components/read-state';
import { section } from '../styles'

const PageSection = (state) => {
	return <div className={ `${ section } page` }>
		{ state.children }
	</div>
}

export default read(PageSection);
