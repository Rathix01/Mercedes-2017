import React from 'react';
import moduleStatepublisher from '../../../components/module-state-publisher';
import Text from '../../text';
import List from '../../list';
import { container, list, item } from '../styles';

const dynamicFormListItemComponent = (state) => {
	return (<div className={ container } style={{ "color": state.orgColor4 }}>
				<List id={ `${state.id}List${state.index}` } itemClass={ item } className={ list }>
					<Text />
				</List>
			</div>);
}

export default moduleStatepublisher(dynamicFormListItemComponent, "DynamicFormListItemComponent");