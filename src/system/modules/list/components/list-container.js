import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import List from './list';
import { getClassName } from '../../../stores/component-helper-store';

const ListContainer = (state) => {
	return (<List id={ state.id + 'List' } children={state.children} className={getClassName(state)} rootId={state.rootId} />);
};

export default moduleStatepublisher(ListContainer, "ListContainer");