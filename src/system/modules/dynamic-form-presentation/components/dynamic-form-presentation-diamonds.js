import React from 'react';
import read from '../../../components/read-state';
import { getClassName } from '../../../stores/component-helper-store';
import { container, smallDiamond, diamonds, cell, largeDiamond, line } from '../styles';

const presentationItemDiamonds = (state) => {
	return (<div className={ `${getClassName(state)} ${container}` }>
			<div className={diamonds}>
				<div className={cell}>
					<div className={smallDiamond} style={{ 'borderColor': state.item.orgColor1 }}></div>
				</div>
				<div className={cell}>
					<div className={largeDiamond} style={{ 'borderColor': state.item.orgColor1 }}></div>
				</div>
				<div className={cell}>
					<div className={smallDiamond} style={{ 'borderColor': state.item.orgColor1 }}></div>
				</div>
			</div>
		</div>);
}

export default read(presentationItemDiamonds, "PresentationItemDiamonds")