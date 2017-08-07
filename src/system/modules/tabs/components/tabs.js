import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import TabPanelsAndLabels from './tabs-panels-and-labels';
import TabChangeListener from './tab-change-listener';

const tabs = (state) => {
	return (
		<div>
			<TabPanelsAndLabels id="ToolTabsPanelsAndLabels" items={ React.Children.toArray(state.children) } labels={state.labels}>
			</TabPanelsAndLabels>
			<TabChangeListener id="TabChangeListener" />
		</div>
	);
};

export default moduleStatepublisher(tabs, "Tabs");