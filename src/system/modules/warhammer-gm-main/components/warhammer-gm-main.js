import React from 'react';
import read from '../../../components/read-state';
import DetailToggleList from '../../detail-toggle-list';
import ActorPanel from '../../warhammer-actor-panel';
import ActorHeader from '../../warhammer-actor-header'
import { main } from '../styles'

const mainPanel = (state) => {
	return  (<div className={ main }>
		<DetailToggleList id="ActorList" isRoot={true}>
		    <ActorHeader />
		    <ActorPanel />
		  </DetailToggleList>
	</div>);
}

export default read(mainPanel);