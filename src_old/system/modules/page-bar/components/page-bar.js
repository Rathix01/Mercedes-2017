import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import PageButton from './page-button';
import {container, list} from '../styles';

const pageBar = (state) => {
	return <div className={container}>
		<List id={ state.id + "Items" } className={list}>
			<PageButton />
		</List>
	</div>
}

export default moduleStatepublisher(pageBar, "PageBar");