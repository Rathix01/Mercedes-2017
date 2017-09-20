import React from 'react'
import Bacon from 'baconjs';
import R from 'ramda';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const mapIndexed = R.addIndex(R.map);
const toAllTabsAction = (state) => state.component === "Tabs";
const toTabChangeAction = (state) => state.component === "TabPanelsAndLabels";
const toTabChangeListenerAction = (state) => state.component === "TabChangeListener" && state.componentEvent === "component-update";
const setTabTarget = (allTabs, target) => mapIndexed((t, idx) => ({ target: t === target.tab, idx }), allTabs.labels);
const toTabTarget = (allTabs, target) => {
	const item = R.head(R.filter((t) => t.target, setTabTarget(allTabs, target)));
	const i = item ? item.idx : 0
	return ({ ...target, tab: target.tab !== undefined ? target.tab : `TabPanelVisibility${ i }` })
};

const toTabVisibility = R.curry((state, item, idx) => `${state.rootId}TabPanelVisibility${idx}` );
const toAllTabs = (allTabs, nextTab) => {
	return ({ hide:mapIndexed(toTabVisibility(nextTab), nextTab.labels || allTabs.labels),  
			  show: nextTab.tab ? nextTab.tab : nextTab.event.target.dataset.target,
			  rootId: nextTab.rootId });
}

const hideTab = (key) => publish(key, { display: false });
const showTab = (key) => publish(key, { display: true });
const publishPanelsAndLabels = (state) => publish(state.rootId, state);
const publishInitLabel = (state) => {
	publish(`${state.id}PanelsAndLabels`, { show: `${state.id}TabPanelVisibility0` })
}
const publishInitTab = (state) => {
	publish(`${state.id}PanelsAndLabelsTabPanelVisibility0`, { display: true });
}



const allTabsAction = Actions.filter(toAllTabsAction); 
const tabUIAction = Actions.filter(toTabChangeAction).toEventStream();

// Hack and slash going on for demo. FIX FIX FIX.
// Fix is to make calling code declare the 3 properties below.
const tabUpdateAction = Actions.filter(toTabChangeListenerAction).map( (s) => ({  ...s,
																				  rootId: "ToolTabsPanelsAndLabels",
																				  tab: "ToolTabsPanelsAndLabelsTabPanelVisibility1",
																				  labels: ["Main", "Edit", "Values"] }) ).toEventStream();



const tabUpdate = Bacon.when([ allTabsAction.toProperty(), tabUpdateAction.skip(1) ], toTabTarget);

const tabAction = tabUIAction.merge(tabUpdate);
const tabsToHideAndShow = Bacon.when([ allTabsAction.toProperty(), tabAction ], toAllTabs);

tabsToHideAndShow.map(R.prop("hide")).flatMap(Bacon.fromArray).onValue(hideTab);
tabsToHideAndShow.map(R.prop("show")).debounce(5).onValue(showTab);
tabsToHideAndShow.onValue(publishPanelsAndLabels);

allTabsAction.onValue(publishInitLabel);
allTabsAction.onValue(publishInitTab);
