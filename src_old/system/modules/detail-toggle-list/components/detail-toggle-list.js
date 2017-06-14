import React from 'react';
import R from 'ramda';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from '../../list';
import DetailToggle from '../../detail-toggle';
import AnimationContainer from '../../animation-container';

const detailToggleList = (state) => <AnimationContainer id={ `${state.id}ListAnimation` }>
  <List id={ state.id + "List" } isRoot='true'>
  	<DetailToggle />
  </List>
</AnimationContainer>

module.exports = moduleStatepublisher(detailToggleList, "DetailToggleList");