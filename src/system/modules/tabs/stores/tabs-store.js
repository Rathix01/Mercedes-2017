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
	return ({ tab: `TabPanelVisibility${ i }` })
};



const toTabVisibility = (item, idx) => `TabPanelVisibility${idx}`
const toAllTabs = (allTabs, nextTab) => {
	return ({ hide:mapIndexed(toTabVisibility, allTabs.labels),  
			  show: nextTab.tab ? nextTab.tab : nextTab.event.target.dataset.target });
}

const hideTab = (key) => publish(key, { display: false });
const showTab = (key) => publish(key, { display: true });

const allTabsAction = Actions.filter(toAllTabsAction); 
const tabUIAction = Actions.filter(toTabChangeAction).toEventStream();
const tabUpdateAction = Actions.filter(toTabChangeListenerAction).toEventStream();

const tabUpdate = Bacon.when([ allTabsAction.toProperty(), tabUpdateAction ], toTabTarget);

const tabAction = tabUIAction.merge(tabUpdate);
const tabsToHideAndShow = Bacon.when([ allTabsAction.toProperty(), tabAction ], toAllTabs);

tabsToHideAndShow.map(R.prop("hide")).flatMap(Bacon.fromArray).onValue(hideTab);
tabsToHideAndShow.map(R.prop("show")).debounce(5).onValue(showTab);
tabsToHideAndShow.onValue(publish("ToolTabsPanelsAndLabels"));

Bacon.once({ show: "TabPanelVisibility0" }).onValue(publish("ToolTabsPanelsAndLabels"));

//show first tab initially.
Bacon.once({ display: true }).onValue(publish("TabPanelVisibility0"));
