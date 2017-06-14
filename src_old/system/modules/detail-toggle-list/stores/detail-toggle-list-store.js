import React from 'react'
import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

//DetailToggleList
const toDetailToggleListEvent = (state) => R.equals(R.prop("component", state), "DetailToggleList");
const toHasItems = (state) => state.items && state.items.length;
const publishToList = (state) => publish( state.id + "List", { items: state.items });
const toItemsWithComponent = (state) => R.merge(state, { items: R.map(includeComponents(state.children), state.items) });
const includeComponents = R.curry((childComponents, item) => R.merge( item, { 
	headerComponent: React.Children.toArray(childComponents)[0],
	itemComponent: React.Children.toArray(childComponents)[1],
	isListMember: true,
}));

const detailToggleListEvent = Actions.filter(toDetailToggleListEvent);
const listUpdates = detailToggleListEvent.filter(toHasItems);
const itemsWithComponent = listUpdates.map(toItemsWithComponent);

itemsWithComponent.onValue(publishToList);

module.exports = {
	listUpdates
}
