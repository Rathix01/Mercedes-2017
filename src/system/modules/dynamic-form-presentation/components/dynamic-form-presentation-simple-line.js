import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';
import { container, line } from '../styles';

const presentationItemLine = (state) => {
	return (<div className={ `${getClassName(state)} ${container}` }>
			<div className={line} style={{ 'backgroundColor': state.item.orgColor3 }}></div>
		</div>);
}

export default read(presentationItemLine, "PresentationItemLine")