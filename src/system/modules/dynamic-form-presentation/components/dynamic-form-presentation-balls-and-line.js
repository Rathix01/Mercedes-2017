import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';
import { container, smallBall, diamonds, cell, largeBall, line } from '../styles';

const presentationItemBallsAndLine = (state) => {

	return (<div className={ `${getClassName(state)} ${container}` }>
			<div className={line} style={{ 'backgroundColor': state.item.orgColor3 }}></div>

			<div className={diamonds}>
				<div className={cell}>
					<div className={smallBall} style={{ 'borderColor': state.item.orgColor1 }}></div>
				</div>
				<div className={cell}>
					<div className={largeBall} style={{ 'borderColor': state.item.orgColor1 }}></div>
				</div>
				<div className={cell}>
					<div className={smallBall} style={{ 'borderColor': state.item.orgColor1 }}></div>
				</div>
			</div>
		</div>);
}

export default read(presentationItemBallsAndLine, "PresentationItemBallsAndLine")