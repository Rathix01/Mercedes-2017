import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import TabPanelsAndLabels from './tabs-panels-and-labels';
import TabChangeListener from './tab-change-listener';

const tabs = (state) => {
	return (
		<div>
			<TabPanelsAndLabels id={ state.id + "PanelsAndLabels" } items={ React.Children.toArray(state.children) } labels={state.labels} isRoot={true}>
			</TabPanelsAndLabels>
			<TabChangeListener id="TabChangeListener" />
		</div>
	);
};

export default moduleStatepublisher(tabs, "Tabs");