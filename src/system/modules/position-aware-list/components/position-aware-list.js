import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import AnimationContainer from '../../animation-container';
import PositionAwareListItem from './position-aware-list-item';
import PositionAwareListUpdateListener from './position-aware-list-update-listener';

const positionAwareList = (state) => {
	//console.log('list?', state)
	return ( <AnimationContainer id={ `${state.id}ListAnimation` }>
	  	<List id={ `${state.id}PositionAware` } isRoot={true} rootId={ `${state.id}PositionAware` }>
	  		<PositionAwareListItem component={state.children}></PositionAwareListItem>
	  	</List>
	  	<PositionAwareListUpdateListener id={ `${state.id}UpdateListener` } />
	</AnimationContainer>);
};

module.exports = moduleStatepublisher(positionAwareList, "PositionAwareList");