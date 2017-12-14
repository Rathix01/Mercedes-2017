import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';
import { container, smallBall, diamonds, cell, largeBall } from '../styles';

const presentationItemBalls = (state) => {
	return (<div className={ `${getClassName(state)} ${container}` }>
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

export default read(presentationItemBalls, "PresentationItemBalls")