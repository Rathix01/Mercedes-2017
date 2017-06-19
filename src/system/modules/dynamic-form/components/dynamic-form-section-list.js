import React from 'react';
import read from '../../../components/read-state';
import List from '../../list';
import Section from './dynamic-form-section';
import { formSection, form } from '../styles';

const dynamicFormSectionList = (state) => {
	return (<List id={ state.id + 'Sections' } className={form} rootId={state.rootId} itemClass={ formSection }>
			<Section />
		</List>
	);
};

export default read(dynamicFormSectionList);